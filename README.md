Am I Rent Stabilized dot com
============================

A web site that informs NYC residents about rent regulation laws, how to find out if they may be rent regulated and paying too much rent, and how to take action.

## Runs on
- [JQuery](http://jquery.com/)
- [Leaflet](http://leafletjs.com/)
- [CartoDB.JS](http://docs.cartodb.com/cartodb-platform/cartodb-js.html)
- [CartoDB SQL API](http://docs.cartodb.com/cartodb-platform/sql-api.html)
- [NYC Geoclient API](https://developer.cityofnewyork.us/api/geoclient-api)
- [Parse-Address](https://github.com/hassansin/parse-address) (U.S. Street Address Parser)

## Sources
- [NYC Map Pluto](http://www.nyc.gov/html/dcp/html/bytes/dwn_pluto_mappluto.shtml)
- New York State's [DHCR](http://www.nyshcr.org/) - [Rent Stabilized Buldings List](https://github.com/clhenrick/dhcr-rent-stabilized-data)
- [Stamen Toner Tiles](http://maps.stamen.com/#toner)

## Installation / Data Processing
### Data Processing:
1. Download and aggregate NYC MapPLUTO data using `ogr2ogr` (see bash scripts in `scripts` folder)
1. Import NYC MapPLUTO data into Postgres / PostGIS locally.
2. Query data in Postgres (see code in the `sql` folder for hints)
3. Import DHCR rent stabilized building list to Postres.
3. Join DHCR's rent stabilized building list to MapPluto.
4. Combine queried MapPLUTO data with DHCR joined data, export as geojson.
2. Load the geojson exported from Postgres to a CartoDB account (free plan should suffice).
3. Point the CDB SQL API to the CartoDB account name and data table (must be set to public).

### Installation
1. Do `bower install` in the root folder to grab all dependencies for web app.  
2. Host code on a webserver of your choice.

