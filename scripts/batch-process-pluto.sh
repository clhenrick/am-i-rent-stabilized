# merge the shape files into one for all of nyc
 #!/bin/bash

file='/Users/clhenrick/data/nyc/map_pluto/all_map_pluto_2014v2.shp'

for i in `find . -name '*MapPLUTO*.shp'`;
do

if [ -f "$file" ]
	then
	  # merge the shape files into one for all of nyc
	  echo "transforming and merging $i" 
	  ogr2ogr -f 'ESRI Shapefile' -s_srs EPSG:2263 -t_srs EPSG:4326 -update -append $file $i -nln all_map_pluto_2014v2
	else
	  # re-project original data from NY Long Island State Plane to WGS84
	  echo "creating $file"
	  ogr2ogr -f 'ESRI Shapefile' -s_srs EPSG:2263 -t_srs EPSG:4326 $file $i
fi

done

# check our merged pluto data
echo "printing $file properties"
ogrinfo -al -so $file

# convert to GeoJSON as it imports into Postgres with less errors than shapefile
json=`echo $file | sed "s/.json/.shp/"`
echo 'creating $json'
ogr2ogr -f GeoJSON $json $file

# import into postgres
# ogr2ogr -f PostgreSQL PG:"host='localhost' dbname='nyc_pluto' user='chrislhenrick' password='' port='5432'" \
# $json -nln all_map_pluto_2012v2