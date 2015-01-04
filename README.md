Am I Rent Stabilized dot com
============================

A web site that informs NYC residents about rent regulation laws, how to find out if they may be rent regulated and paying too much rent, and how to take action.

## Runs on
- JQuery
- Leaflet
- CartoDB.JS
- CartoDB SQL API
- NYC Geoclient API

## Sources
- NYC Map Pluto
- DHCR's rent stabilized buldings list
- Stamen Toner Tiles

## Installation / Data Processing
### Data Processing:
1. Download and aggregate NYC MapPLUTO data using `ogr2ogr` (see bash scripts in `scripts` folder)
1. Import NYC MapPLUTO data into Postgres / PostGIS locally.
2. Query data in Postgres (see code in the `sql` folder for hints)
3. Join DHCR's rent stabilized building list to MapPluto
4. Combine queried MapPLUTO data with DHCR joined data, export as geojson.
2. Load the geojson exported from Postgres to a CartoDB account (free plan should suffice).
3. Use the CartoDB account name and table (must be set to public) for the CDB SQL API.

### Installation
1. Do `bower install` in the root folder to grab all dependencies for web app.  
2. Host code on a webserver of your choice.

