Am I Rent Stabilized dot com
============================

A web site that informs NYC residents about rent regulation laws and how to find out if they may be rent regulated and paying too much rent.

## Runs on
- JQuery
- CartoDB's SQL API
- NYC Geoclient API
- Proj4 JS

## Uses Data From
- NYC Map Pluto
- DHCR rent stabilized buldings

## Installation

Do `bower install` in the root folder to grab all dependencies.

## Data Processing
See the `sql` and `scripts` directories for code to process the Map Pluto spatial data using Postgres with PostGIS and OGR2OGR.