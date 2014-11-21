-- do this in CartoDB
-- use values in address column for "geocoding"
-- add a column for street number
ALTER TABLE bk_likely_rent_stablized ADD COLUMN street_number TEXT

-- add  a column for street name
ALTER TABLE bk_likely_rent_stablized ADD COLUMN street_name TEXT

-- split each row's address into a separate number and name:
UPDATE bk_likely_rent_stablized set street_number = split_part(address, ' ', 1)

UPDATE bk_likely_rent_stablized set street_name = regexp_replace(address, '^' || street_number || ' ', '')

-- sample ST_Intersection using lat lon point:
SELECT * FROM bk_likely_rent_stablized 
WHERE ST_Intersects(
    ST_GeomFromText(
        'Point(-73.95757100000003 40.657986)',
        4326
        ), 
    the_geom)

-- create actual borough names from abbreviations:
UPDATE nyc_likely_rent_stabilized set boro_name_long = 'Manhattan' where borough = 'MN';

UPDATE nyc_likely_rent_stabilized set boro_name_long = 'Brooklyn' where borough = 'BK';

UPDATE nyc_likely_rent_stabilized set boro_name_long = 'Queens' where borough = 'QN';

UPDATE nyc_likely_rent_stabilized set boro_name_long = 'Staten Island' where borough = 'SI';

UPDATE nyc_likely_rent_stabilized set boro_name_long = 'Bronx' where borough = 'BX'