# merge the shape files into one for all of nyc
 #!/bin/bash

 file="./all_map_pluto.shp"

 for i in $(ls *.shp)
 do

       if [ -f "$file" ]
       then
            echo "merging..." 
            ogr2ogr -f 'ESRI Shapefile' -s_srs EPSG:2263 -t_srs EPSG:4326 -update -append $file $i -nln merge
       else
            echo "creating all_map_pluto.shp"
       ogr2ogr -f 'ESRI Shapefile' $file $i
 fi
 done