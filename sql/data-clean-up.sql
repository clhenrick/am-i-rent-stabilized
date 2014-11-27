-- create actual borough names from abbreviations:
UPDATE nyc_likely_rent_stabilized set boro_name_long = 'Manhattan' where borough = 'MN';

UPDATE nyc_likely_rent_stabilized set boro_name_long = 'Brooklyn' where borough = 'BK';

UPDATE nyc_likely_rent_stabilized set boro_name_long = 'Queens' where borough = 'QN';

UPDATE nyc_likely_rent_stabilized set boro_name_long = 'Staten Island' where borough = 'SI';

UPDATE nyc_likely_rent_stabilized set boro_name_long = 'Bronx' where borough = 'BX'

-- sample ST_Intersection using a lat lon point:
SELECT * FROM bk_likely_rent_stablized 
WHERE ST_Intersects(
    ST_GeomFromText(
        'Point(-73.95757100000003 40.657986)',
        4326
        ), 
    the_geom)

create index all_map_pluto_2014v1_gix on all_map_pluto_2014v1 USING gist (wkb_geometry);
vacuum analyze all_map_pluto_2014v1;
