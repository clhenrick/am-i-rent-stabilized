# Get JSON data from NYC GeoClient API
# must pass property info as separate variable input to script:
# house number, street name, street suffix, boro name
# see: https://dev-mgmt.cityofnewyork.us/docs/geoclient/v1

#!/bin/bash

NUM=$1
NAME=$2
SUFFIX=$3
BORO=$4

url="https://api.cityofnewyork.us/geoclient/v1/address.json?"
stNum="houseNumber=$NUM&"
stName="street=$NAME+$SUFFIX&"
borough="borough=$BORO&"
id="9cd0a15f"
key="54dc84bcaca9ff4877da771750033275"
appID="app_id=$id&"
appKey="app_key=$key"

urlconcat=$url$stNum$stName$borough$appID$appKey

echo "URL string is: $urlconcat"

curl -v  -X GET $urlconcat

# sample url string
# "https://api.cityofnewyork.us/geoclient/v1/address.json?" +  
# "houseNumber=146&street=Fenimore+St&borough=Brooklyn&" + 
# "app_id=9cd0a15f&app_key=54dc84bcaca9ff4877da771750033275"
