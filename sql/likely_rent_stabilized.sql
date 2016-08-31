--- first import each of the MAPPluto shapefiles into PostGIS,
--- they can be downloaded from: http://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page#mappluto
--- UNION to one table
DROP TABLE IF EXISTS all_mappluto;

CREATE TABLE all_mappluto AS (
  SELECT * FROM bk_mappluto
  UNION ALL
  SELECT * FROM bx_mappluto
  UNION ALL
  SELECT * FROM mn_mappluto
  UNION ALL
  SELECT * FROM qn_mappluto
  UNION ALL
  SELECT * FROM si_mappluto
);

CREATE INDEX all_mappluto_gist ON all_mappluto USING GIST(geom);

--- properties built before 1974 with 6 or more units that aren't coops or condos
--- and aren't in the DHCR list of buildings that have registered as having RS units
DROP TABLE IF EXISTS map_pluto_not_dhcr;
CREATE TABLE map_pluto_not_dhcr AS
	SELECT not_dhcr.address,
		not_dhcr.unitsres,
		not_dhcr.borough,
		not_dhcr.ownername,
		not_dhcr.zipcode,
		not_dhcr.yearbuilt,
		not_dhcr.geom,
		not_dhcr.cd,
		not_dhcr.council,
		not_dhcr.bbl::bigint
	FROM
		(
			SELECT a.*
			FROM
			(
				SELECT * FROM all_mappluto
				WHERE yearbuilt < 1974 AND unitsres >= 6
				    AND (ownername not ILIKE 'new york city housing authority' or ownername not ILIKE 'nycha')
				    AND bldgclASs not ILIKE 'r%'
			) AS a
			LEFT JOIN
			(
		  	SELECT * FROM dhcr_rs
		  	WHERE bbl IS NOT NULL
			) AS b
			ON a.bbl = b.bbl
			WHERE b.bbl IS NULL
		) AS not_dhcr;

--- properties in the DHCR list of buildings that have registered as having RS units
DROP TABLE IF EXISTS map_pluto_dhcr_rs;
CREATE TABLE map_pluto_dhcr_rs AS
	SELECT dhcr.address,
					dhcr.unitsres,
					dhcr.borough,
					dhcr.ownername,
					dhcr.zipcode,
					dhcr.yearbuilt,
					dhcr.geom,
					dhcr.cd,
					dhcr.council,
					dhcr.bbl::bigint
	FROM
		(SELECT c.address,
						c.unitsres,
						c.borough,
						c.ownername,
						c.zipcode,
						c.yearbuilt,
						c.bbl,
						c.cd,
						c.council,
						c.geom
			FROM
			all_mappluto c,
			(
		  	SELECT DISTINCT bbl FROM dhcr_rs
		  	WHERE bbl IS NOT NULL
			) d
			WHERE c.bbl = d.bbl
		) AS dhcr;

--- Properties with 421a tax-exemptions from taxbills.nyc data scrape
DROP TABLE IF EXISTS map_pluto_exempt_rs;
CREATE TABLE map_pluto_exempt_rs AS
	SELECT exempt.address,
					exempt.unitsres,
					exempt.borough,
					exempt.ownername,
					exempt.zipcode,
					exempt.yearbuilt,
					exempt.geom,
					exempt.cd,
					exempt.council,
					exempt.bbl::bigint
	FROM
		(
			SELECT a.address,
						a.unitsres,
						a.borough,
						a.ownername,
						a.zipcode,
						a.yearbuilt,
						a.bbl,
						a.cd,
						a.council,
						a.geom
			FROM
			all_mappluto a,
			(
				SELECT DISTINCT bbl
				FROM exempt_stabilized
				WHERE bbl IS NOT NULL
			) b
			WHERE a.bbl = b.bbl
		) AS exempt;

-- I then added a column to identify properties that are registered or not registered with the DHCR:
ALTER TABLE map_pluto_not_dhcr add column registered boolean;
UPDATE map_pluto_not_dhcr set registered = false;

ALTER TABLE map_pluto_dhcr_rs add column registered boolean;
UPDATE map_pluto_dhcr_rs set registered = true;

ALTER TABLE map_pluto_exempt_rs add column registered boolean;
UPDATE map_pluto_exempt_rs set registered = NULL;

-- now these two tables can be combined AND have a boolean value for whether or not
-- they are in the DHCR's rent-stabilized buildings list.
-- 59,679 rows total.
DROP TABLE IF EXISTS map_pluto_likely_rs;
CREATE TABLE map_pluto_likely_rs AS
	SELECT *
	FROM
		map_pluto_not_dhcr
	UNION
	SELECT *
	FROM
		map_pluto_dhcr_rs
	UNION
	SELECT *
	FROM
		map_pluto_exempt_rs;


-- check to make sure the data looks good:
SELECT Count(*) FROM mappluto_likely_rs WHERE registered IS NULL;
	-- returns 6079 rows (exempt stabilized)
SELECT Count(DISTINCT bbl) FROM mappluto_likely_rs;
  -- returns 59,679 rows
SELECT Count(*) FROM mappluto_likely_rs WHERE geom IS NULL;
	-- returns 0 rows
SELECT Sum(unitsres) AS total_res_units FROM mappluto_likely_rs;
	-- returns 1,962,469

--  In CartoDB I did the following
--  remove all properties owned by the NYC Housing Authority that I missed.
--  this involved doing a spatial intersect with the NYCHA shapefile
--  available on NYC Open Data to determine all spellings of NYCHA:
SELECT DISTINCT a.ownername
FROM map_pluto_likely_rs a, nycha_centroids b
where
  ST_Intersects(
      a.the_geom, b.the_geom
  )
ORDER BY ownername

-- remove properties that are obviously owned by NYCHA
DELETE FROM map_pluto_likely_rs WHERE ownername ILIKE 'NYC HOUSING%';
DELETE FROM map_pluto_likely_rs WHERE ownername ILIKE 'new york city%';
DELETE FROM map_pluto_likely_rs WHERE ownername ILIKE 'NYC CITY HSG%';
DELETE FROM map_pluto_likely_rs WHERE ownername = 'CITY OF NEW YORK';
DELETE FROM map_pluto_likely_rs WHERE ownername ILIKE 'N Y C H A%';
DELETE FROM map_pluto_likely_rs WHERE ownername ILIKE 'N.Y.C. HOUSING AUTHOR%';
DELETE FROM map_pluto_likely_rs WHERE ownername ILIKE 'N Y C HOUSING AUTHORI%';
DELETE FROM map_pluto_likely_rs WHERE ownername = 'NY HOUSING AUTHORITY';
DELETE FROM map_pluto_likely_rs WHERE ownername = 'NEW YRK CTY HSG AUTHR';

-- pgsql2shp converted boolean value of the "registered" column to T / F,
-- so I changed the valuse to 'yes' / 'no' for infowindows
UPDATE map_pluto_likely_rs set registered = 'no' WHERE registered = 'F';
UPDATE map_pluto_likely_rs set registered = 'yes' WHERE registered = 'T';
UPDATE map_pluto_likely_rs_2016v1 set registered = 'unknown' WHERE registered = '?';

-- change boro codes to actual names for infowindows
UPDATE map_pluto_likely_rs set borough = 'Queens' WHERE borough = 'QN';
UPDATE map_pluto_likely_rs set borough = 'Brooklyn' WHERE borough = 'BK';
UPDATE map_pluto_likely_rs set borough = 'Staten Island' WHERE borough = 'SI';
UPDATE map_pluto_likely_rs set borough = 'Bronx' WHERE borough = 'BX';
UPDATE map_pluto_likely_rs set borough = 'Manhattan' WHERE borough = 'MN';
