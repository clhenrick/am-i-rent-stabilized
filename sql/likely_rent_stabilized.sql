--- first import each of the MAPPluto shapefiles into PostGIS using shp2pgsql,
--- they can be downloaded from: http://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page#mappluto
--- then UNION ALL to one table
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


--- to create the likely rent stabilized table:
DROP TABLE IF EXISTS map_pluto_likely_rs;

CREATE TABLE map_pluto_likely_rs (
	bbl bigint primary key,
	address varchar,
	unitsres integer,
	borough varchar,
	ownername varchar,
	zipcode integer,
	yearbuilt smallint,
	geom geometry(MultiPolygon,2263),
	cd smallint,
	council smallint,
	registered boolean,
	exemptions varchar
);

--- insert rows that don't match the DHCR data, mark them as registered = FALSE
INSERT INTO map_pluto_likely_rs
SELECT not_dhcr.bbl::bigint,
	not_dhcr.address,
	not_dhcr.unitsres,
	not_dhcr.borough,
	not_dhcr.ownername,
	not_dhcr.zipcode,
	not_dhcr.yearbuilt,
	not_dhcr.geom,
	not_dhcr.cd,
	not_dhcr.council,
	not_dhcr.registered
FROM (
	SELECT a.*,
				 FALSE AS registered
	FROM
	(
		SELECT * FROM all_mappluto
		WHERE yearbuilt < 1974 AND unitsres >= 6
				AND (ownername not ILIKE 'new york city housing authority' or ownername not ILIKE 'nycha')
				AND bldgclASs not ILIKE 'r%'
	) AS a
	LEFT JOIN
	(
		SELECT DISTINCT bbl FROM dhcr_rs
		WHERE bbl IS NOT NULL
	) AS b
	ON a.bbl = b.bbl
	WHERE b.bbl IS NULL -- rows that don't match / aren't in the DHCR data
) AS not_dhcr;
--- total row count at this point should should be 41634

--- insert rows with BBLS that match the DHCR data
INSERT INTO map_pluto_likely_rs
SELECT dhcr.bbl::bigint,
		dhcr.address,
		dhcr.unitsres,
		dhcr.borough,
		dhcr.ownername,
		dhcr.zipcode,
		dhcr.yearbuilt,
		dhcr.geom,
		dhcr.cd,
		dhcr.council,
		dhcr.registered
FROM (
	SELECT a.bbl,
		a.address,
		a.unitsres,
		a.borough,
		a.ownername,
		a.zipcode,
		a.yearbuilt,
		a.geom,
		a.cd,
		a.council,
		TRUE AS registered
	FROM
	all_mappluto a,
	(
  	SELECT DISTINCT bbl FROM dhcr_rs
  	WHERE bbl IS NOT NULL
	) b
	WHERE a.bbl = b.bbl
) AS dhcr;
--- total row count at this point should be 55150 at this point

--- Properties with 421a tax-exemptions from the taxbills.nyc data
--- This query differs from the above as we pull in columns "exemptions"
--- from exempt_stabilized table that state 421a tax exemption types
DROP TABLE IF EXISTS map_pluto_exempt_rs;
CREATE TABLE map_pluto_exempt_rs AS
	SELECT exempt.bbl::bigint,
		exempt.address,
		exempt.unitsres,
		exempt.borough,
		exempt.ownername,
		exempt.zipcode,
		exempt.yearbuilt,
		exempt.geom,
		exempt.cd,
		exempt.council,
		exempt.exemptions
	FROM
		(
			SELECT a.bbl,
				a.address,
				a.unitsres,
				a.borough,
				a.ownername,
				a.zipcode,
				a.yearbuilt,
				a.cd,
				a.council,
				a.geom,
				b.exemptions
			FROM
			all_mappluto a,
			(
				SELECT bbl,
					exemptions
				FROM exempt_stabilized
			) b
			WHERE a.bbl = b.bbl
		) AS exempt;

--- Because the exempt_stabilized data overlaps with what's already in our likely_rs table,
--- we'll do an UPSERT query to avoid adding rows with duplicate BBL values
INSERT INTO map_pluto_likely_rs
SELECT a.bbl::bigint,
		a.address,
		a.unitsres,
		a.borough,
		a.ownername,
		a.zipcode,
		a.yearbuilt,
		a.geom,
		a.cd,
		a.council,
		FALSE AS registered,
		a.exemptions
FROM map_pluto_exempt_rs a
on conflict (bbl)
do update set exemptions = 'needs updating'; --- my limitation in understanding upserts with Postgres 9.5
--- total row count at this point should be 60514

--- fix values for "exemptions" that have 'needs updating'
UPDATE map_pluto_likely_rs a
SET exemptions = b.exemptions
FROM map_pluto_exempt_rs b
WHERE a.bbl = b.bbl
AND a.exemptions = 'needs updating';

--- set "registered" = TRUE based on exempt_stabilized.registred_units
UPDATE map_pluto_likely_rs a
SET registered = TRUE
FROM exempt_stabilized b
WHERE b.registered_stabilized_apts > 0
  AND a.bbl = b.bbl;

--- From here, export the data using pgsql2shp and name the output shapefile map_pluto_likely_rs_2016v1.shp

--  In CartoDB I did the following:
--  import map_pluto_likely_rs_2016v1.shp
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
DELETE FROM map_pluto_likely_rs_2016v1 WHERE ownername ILIKE 'NYC HOUSING%';
DELETE FROM map_pluto_likely_rs_2016v1 WHERE ownername ILIKE 'new york city%';
DELETE FROM map_pluto_likely_rs_2016v1 WHERE ownername ILIKE 'NYC CITY HSG%';
DELETE FROM map_pluto_likely_rs_2016v1 WHERE ownername = 'CITY OF NEW YORK';
DELETE FROM map_pluto_likely_rs_2016v1 WHERE ownername ILIKE 'N Y C H A%';
DELETE FROM map_pluto_likely_rs_2016v1 WHERE ownername ILIKE 'N.Y.C. HOUSING AUTHOR%';
DELETE FROM map_pluto_likely_rs_2016v1 WHERE ownername ILIKE 'N Y C HOUSING AUTHORI%';
DELETE FROM map_pluto_likely_rs_2016v1 WHERE ownername = 'NY HOUSING AUTHORITY';
DELETE FROM map_pluto_likely_rs_2016v1 WHERE ownername = 'NEW YRK CTY HSG AUTHR';

-- pgsql2shp converted boolean value of the "registered" column to T / F,
-- so I changed the valuse to 'yes' / 'no' for infowindows
UPDATE map_pluto_likely_rs_2016v1 set registered = 'no' WHERE registered = 'F';
UPDATE map_pluto_likely_rs_2016v1 set registered = 'yes' WHERE registered = 'T';
UPDATE map_pluto_likely_rs_2016v1 set registered = 'unknown' WHERE registered = '?';

-- change boro codes to actual names for infowindows
UPDATE map_pluto_likely_rs_2016v1 set borough = 'Queens' WHERE borough = 'QN';
UPDATE map_pluto_likely_rs_2016v1 set borough = 'Brooklyn' WHERE borough = 'BK';
UPDATE map_pluto_likely_rs_2016v1 set borough = 'Staten Island' WHERE borough = 'SI';
UPDATE map_pluto_likely_rs_2016v1 set borough = 'Bronx' WHERE borough = 'BX';
UPDATE map_pluto_likely_rs_2016v1 set borough = 'Manhattan' WHERE borough = 'MN';


--- Following are just extra queries
----------------------------------------
--- To create the tables individually do the Following:
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
		  	SELECT DISTINCT bbl FROM dhcr_rs
		  	WHERE bbl IS NOT NULL
			) AS b
			ON a.bbl = b.bbl
			WHERE b.bbl IS NOT NULL
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
					dhcr.bbl::bigint primary key
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


--- add a column to identify properties that are registered or not registered with the DHCR
--- properties that are found in the DHCR list of buildings that registred their RS apts
ALTER TABLE map_pluto_not_dhcr add column registered boolean;
UPDATE map_pluto_not_dhcr set registered = false;

--- properties that are NOT found in the DHCR list but match the general criteria for likely having RS apts
ALTER TABLE map_pluto_dhcr_rs add column registered boolean;
UPDATE map_pluto_dhcr_rs set registered = true;

--- this table will get updated later from the exempt_stabilized.registered_stabilized_apts column
ALTER TABLE map_pluto_exempt_rs add column registered boolean;
UPDATE map_pluto_exempt_rs set registered = false;

-- The not_dhcr_rs and dhcr_rs tables can now be combined via a UNION
DROP TABLE IF EXISTS map_pluto_likely_rs;
CREATE TABLE map_pluto_likely_rs AS
	SELECT *
	FROM
		map_pluto_not_dhcr
	UNION
	SELECT *
	FROM
		map_pluto_dhcr_rs;

--- Add column "exemptions" for tax-exemption status to map_pluto_likely_rs
ALTER TABLE map_pluto_likely_rs ADD COLUMN exemptions text DEFAULT NULL;

--- update the "exemptions" column on map_pluto_likely_rs
UPDATE map_pluto_likely_rs SET exemptions = (
	SELECT exemptions
	FROM exempt_stabilized
	WHERE exempt_stabilized.bbl = map_pluto_likely_rs.bbl
);

INSERT INTO map_pluto_likely_rs
SELECT * FROM map_pluto_exempt_rs
WHERE (
	SELECT bbl FROM map_pluto_exempt_rs a
	WHERE a.bbl != map_pluto_likely_rs b
)

--- Following queries are just checks for differences between likely_rs and exempt_rs
--- How many BBLs are duplicates in likely_rs and exempt_rs? 749
-- select count(a.bbl) from map_pluto_likely_rs a, map_pluto_exempt_rs b where a.bbl = b.bbl;

--- How many BBLs from exempt_rs don't exist in likely_rs? 6113 - 749 = 5364
-- select count(*) from map_pluto_exempt_rs;

--- Now to do an insert and update using map_pluto_exempt_rs
--- insert rows from exempt_rs that don't already exist in likely_rs

--- update existing rows that have a matching BBL and set "registered" = TRUE and
--- "tax_exemption" = exempt_stabilized.exemptions

-- check to make sure the data looks good:
SELECT Count(*) FROM mappluto_likely_rs WHERE registered IS NULL;
	-- returns 6079 rows (exempt stabilized)
SELECT Count(DISTINCT bbl) FROM mappluto_likely_rs;
  -- returns 59,679 rows
SELECT Count(*) FROM mappluto_likely_rs WHERE geom IS NULL;
	-- returns 0 rows
SELECT Sum(unitsres) AS total_res_units FROM mappluto_likely_rs;
	-- returns 1,962,469
