-- create a column for borough names
ALTER TABLE nyc_likely_rent_stablized ADD COLUMN "borough" text;

-- create actual borough names from abbreviations:
UPDATE nyc_likely_rent_stablized
SET borough = 
	CASE WHEN borocode = 1 THEN 'Manhattan'
		WHEN borocode = 2 THEN 'Bronx'
		WHEN borocode = 3 THEN 'Brooklyn'
		WHEN borocode = 4 THEN 'Queens'
		WHEN borocode = 5 THEN 'Staten Island'
	END

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
