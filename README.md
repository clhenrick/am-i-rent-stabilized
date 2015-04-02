Am I Rent Stabilized 
============================

A web site that informs NYC residents about Rent Stabilization, how to find out if their apartment may be rent stabilized and paying too much rent, and what to do about it.  

See it in action at [amirentstabilized.com](http://amirentstabilized.com/).

## (Version 2) Runs on
- [Greensock's GSAP Animation Library](http://greensock.com/gsap)
- [CartoDB JS](http://docs.cartodb.com/cartodb-platform/cartodb-js.html)
- [CartoDB SQL API](http://docs.cartodb.com/cartodb-platform/sql-api.html)
- [CartoDB's Positron map tiles](http://cartodb.com/basemaps/)
- [NYC Geoclient API](https://developer.cityofnewyork.us/api/geoclient-api)
- [GitHub Pages](https://pages.github.com/)

## Data Sources
- [NYC Map Pluto](http://www.nyc.gov/html/dcp/html/bytes/dwn_pluto_mappluto.shtml) (Tax Lot data)
- New York State's [HCR](http://www.nyshcr.org/) - [Rent Stabilized Buldings List](https://github.com/clhenrick/dhcr-rent-stabilized-data)

## Installation
1. In terminal `cd` to this repo and do `bower install && npm install` to grab all dependencies.  
2. Host code on a webserver of your choice.

## Data Processing:
The processed data is [publicly available for download on CartoDB](http://chenrick.cartodb.com/tables/all_nyc_likely_rent_stabl_merged/public) but if you'd like to host it yourself you may do the following (note you will need to have [GDAL](http://www.gdal.org/) and [PostGIS](http://postgis.net/) installed):

1. Aggregate NYC's MapPLUTO dataset using `ogr2ogr` (see bash scripts in `scripts` folder)
1. Import NYC MapPLUTO data into Postgres / PostGIS locally.
2. Query data in Postgres (see code in the `sql` folder for hints)
3. Import DHCR rent stabilized building list to Postres.
3. Join DHCR's rent stabilized building list to MapPluto.
4. Combine queried MapPLUTO data with DHCR joined data, export as GeoJSON.
2. Load the GeoJSON exported from Postgres to a CartoDB account (a free plan should suffice).
3. Point the CDB SQL API to the CartoDB account name and data table (it must be set to public).

## Credits
- Big thanks to [Caroline Woolard](http://carolinewoolard.com/) for suggesting the idea to me.

- [Jue Yang](https://github.com/jueyang) designed the awesome building graphics which informed the overall redesign of version 2 of the site, as well as helped with translating the content to Chinese.

- Thanks to [BetaNYC](http://betanyc.us/) for providing motivational support.

- Thanks to Chris & Ed at [Radish Lab](http://radishlab.com/) for UI/UX design assistance.

### Fullscreen slides with GSAP's TweenLite, CSSPlugin and ScrollToPlugin
Forked from [Chrysto](http://codepen.io/bassta/)'s Pen [Fullscreen slides with TweenLite, CSSPlugin and ScrollToPlugin](http://codepen.io/bassta/pen/kDvmC/).

A [Pen](http://codepen.io/anon/pen/XJqaRg) by [Captain Anonymous](http://codepen.io/anon) on [CodePen](http://codepen.io/).

[License](http://codepen.io/anon/pen/XJqaRg/license).

## LICENSE
[Creative Commons Attribution-NonCommercial ](http://creativecommons.org/licenses/by-nc/4.0/)   
(CC BY-NC)

In other words: **_Not For Profit!_**
