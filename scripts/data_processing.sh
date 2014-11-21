# note to self: combine data transformation with importing to the same table in Postgres as one OGR command
# re-project original data to WGS84 and save as geojson
ogr2ogr -f 'GeoJSON' -s_srs EPSG:2263 -t_srs EPSG:4326  boroughs_4326/bk_map_pluto_4326.json boroughs_2263/Brooklyn/BKMapPLUTO.shp
ogr2ogr -f 'GeoJSON' -s_srs EPSG:2263 -t_srs EPSG:4326  boroughs_4326/bx_map_pluto_4326.json boroughs_2263/Bronx/BXMapPLUTO.shp
ogr2ogr -f 'GeoJSON' -s_srs EPSG:2263 -t_srs EPSG:4326  boroughs_4326/mn_map_pluto_4326.json boroughs_2263/Manhattan/MNMapPLUTO.shp
ogr2ogr -f 'GeoJSON' -s_srs EPSG:2263 -t_srs EPSG:4326  boroughs_4326/si_map_pluto_4326.json boroughs_2263/Staten_Island/SIMapPLUTO.shp
ogr2ogr -f 'GeoJSON' -s_srs EPSG:2263 -t_srs EPSG:4326  boroughs_4326/qn_map_pluto_4326.json boroughs_2263/Queens/QNMapPLUTO.shp

# import GeoJSON files into PostGIS
ogr2ogr -f PostgreSQL PG:"host='localhost' user='chrislhenrick' port='5432' dbname='nyc_pluto' password=''" bk_map_pluto_4326.json -nln bk_pluto \
ogr2ogr -f PostgreSQL PG:"host='localhost' user='chrislhenrick' port='5432' dbname='nyc_pluto' password=''" bx_map_pluto_4326.json -nln bx_pluto \
ogr2ogr -f PostgreSQL PG:"host='localhost' user='chrislhenrick' port='5432' dbname='nyc_pluto' password=''" mn_map_pluto_4326.json -nln mn_pluto \
ogr2ogr -f PostgreSQL PG:"host='localhost' user='chrislhenrick' port='5432' dbname='nyc_pluto' password=''" qn_map_pluto_4326.json -nln qn_pluto \
ogr2ogr -f PostgreSQL PG:"host='localhost' user='chrislhenrick' port='5432' dbname='nyc_pluto' password=''" si_map_pluto_4326.json -nln si_pluto

# select features that are likely rent stabilized
ogr2ogr -f GeoJSON -t_srs EPSG:4326 bx_likely_rent_stabilized.geojson \
PG:"host='localhost' dbname='nyc_pluto' user='chrislhenrick' password='' " \
-sql "SELECT * FROM bx_pluto where yearbuilt < 1974 AND unitsres > 6"

ogr2ogr -f GeoJSON -t_srs EPSG:4326 qn_likely_rent_stabilized.geojson \
PG:"host='localhost' dbname='nyc_pluto' user='chrislhenrick' password='' " \
-sql "SELECT * FROM qn_pluto where yearbuilt < 1974 AND unitsres > 6"

ogr2ogr -f GeoJSON -t_srs EPSG:4326 mn_likely_rent_stabilized.geojson \
PG:"host='localhost' dbname='nyc_pluto' user='chrislhenrick' password='' " \
-sql "SELECT * FROM mn_pluto where yearbuilt < 1974 AND unitsres > 6"

ogr2ogr -f GeoJSON -t_srs EPSG:4326 si_likely_rent_stabilized.geojson \
PG:"host='localhost' dbname='nyc_pluto' user='chrislhenrick' password='' " \
-sql "SELECT * FROM si_pluto where yearbuilt < 1974 AND unitsres > 6"

ogr2ogr -f GeoJSON -t_srs EPSG:4326 bk_likely_rent_stabilized.geojson \
PG:"host='localhost' dbname='nyc_pluto' user='chrislhenrick' password='' " \
-sql "SELECT * FROM bk_pluto where yearbuilt < 1974 AND unitsres > 6"

# convert to shapefile for geoprocessing / merging
ogr2ogr -f 'ESRI Shapefile' shp/bk_likely_rent_stabilized.shp bk_likely_rent_stabilized.geojson 
ogr2ogr -f 'ESRI Shapefile' shp/mn_likely_rent_stabilized.shp mn_likely_rent_stabilized.geojson 
ogr2ogr -f 'ESRI Shapefile' shp/si_likely_rent_stabilized.shp si_likely_rent_stabilized.geojson 
ogr2ogr -f 'ESRI Shapefile' shp/qn_likely_rent_stabilized.shp qn_likely_rent_stabilized.geojson 
ogr2ogr -f 'ESRI Shapefile' shp/bx_likely_rent_stabilized.shp bx_likely_rent_stabilized.geojson 

# merge the shape files into one for all of nyc
 #!/bin/bash

 file="~/gis_data/ny/likely_rent_stabilized/shp/all_likely_rent_stabilized.shp"

 for i in $(ls *.shp)
 do

       if [ -f "$file" ]
       then
            echo "merging...."
            ogr2ogr -f ‘ESRI Shapefile’ -update -append $file $i -nln merge
       else
            echo "creating all_likely_rent_stabilized.shp" 
       ogr2ogr -f ‘ESRI Shapefile’ $file $i
 fi
 done

# make a copy of the merged shapefile in geojson format
ogr2ogr -f 'GeoJSON' geojson/all_likely_rent_stabilized.geojson  shp/all_likely_rent_stabilized.shp

