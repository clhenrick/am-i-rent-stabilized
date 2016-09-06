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

--- change null values in "exemptions" to 'none listed'
update map_pluto_likely_rs_2016v1 set exemptions = 'none listed' where exemptions is null

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
