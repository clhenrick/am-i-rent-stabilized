 #!/bin/bash
# merge the shape files into one for all of nyc

for FILE in *.json
 do
    echo "converting $FILE to shapefile format"
    FILENEW=`echo $FILE | sed "s/.json/.shp/"`
    ogr2ogr \
    -f 'ESRI Shapefile' \
    -s_srs EPSG:2263 \
    -t_srs EPSG:4326 \
    $FILENEW $FILE 

 done

 exit