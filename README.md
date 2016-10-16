Am I Rent Stabilized?
============================
![](app/assets/png/airs_landing_page.png)

A mobile friendly, multi-lingual web app that informs NYC residents about [Rent Stabilization](http://www.nycrgb.org/html/resources/faq/rentstab.html) by simplifying the process of how to find out if their apartment may be rent stabilized, if they are paying too much rent, and what to do about it.  

See it in action at [amirentstabilized.com](https://amirentstabilized.com/).

## V2 Runs on
- [Greensock's GSAP Animation Library](http://greensock.com/gsap)
- [CartoDB JS](http://docs.cartodb.com/cartodb-platform/cartodb-js.html)
- [CartoDB SQL API](http://docs.cartodb.com/cartodb-platform/sql-api.html)
- [CartoDB's Positron map tiles](http://cartodb.com/basemaps/)
- [NYC Geoclient API](https://developer.cityofnewyork.us/api/geoclient-api)
- [Handlebars.js](http://handlebarsjs.com/)
- [AddToCalendar.js](https://github.com/AddToCalendar/addtocalendar)
- [addThis](http://addthis.com)

## Data Sources
- [NYC MapPluto](http://www.nyc.gov/html/dcp/html/bytes/dwn_pluto_mappluto.shtml) Tax Lot geospatial data.
- New York State's [HCR](http://www.nyshcr.org/) - [Rent Stabilized Buldings List](https://github.com/clhenrick/dhcr-rent-stabilized-data).
- Exempt Stabilized buildings via [nyc-stabilization-unit-counts](https://github.com/talos/nyc-stabilization-unit-counts).

## Installation
Make sure you have Node.js at v5.9.1 or greater with `Node-Sass`, `Handlebars`, and `Gulp` modules installed globally.  
1. In terminal `cd` to this repo and do `npm install` to grab all dependencies.  
2. Run `gulp production` to compile the distribution code.  
3. Host code on a webserver of your choice.  

## Develop
Make sure you have Node.js at v5.9.1 or greater with `Node-Sass`, `Handlebars`, and `Gulp` modules installed globally.  
- Run `gulp` to start a local server and automatically watch for changes. The site will refresh automatically after making any changes.  
- Run `gulp production` to compile the distribution code in a `build/` directory.

## Updating the Site's Content:
As the entire site is translated to Chinese and Spanish, any changes to the site's content must also be translated to these languages. This is done by editing  the JSON files in `data/`. Any changes to the site structure must be made to the Handlebars templates in `app/templates/`. Each of the JSON files and Handlebars files in these folders corresponds to one page of the app (`index.html`, `why-it-matters.html`, `how-it-works.html`, & `resources.html`). Each JSON file contains the content in 3 languages while each template file contains the markup and Handlebars templating code.

After updating these sets of files you must precompile the templates for them to be updated in the app. Make sure you have Node.JS and the Handlebars module installed globally then do:

```
handlebars app/templates/*.hbs -n app.templates -f app/js/app/templates.js
```

**Note** that if you're running the `gulp default` task, making changes to any files in `app/templates/*.hbs` will automatically re-compile `app/js/templates.js`.

## Data Processing:
The processed data is [publicly available for download on CartoDB](https://chenrick.carto.com/tables/map_pluto_likely_rs_2016v1/public/map) but if you'd like to host it yourself you may do the following (note you will need to have [GDAL](http://www.gdal.org/) and [PostGIS](http://postgis.net/) installed):

1. Import each of the [NYC MapPLUTO](http://www1.nyc.gov/site/planning/data-maps/open-data.page) shapefiles into Postgres / PostGIS. I recommend using `shp2pgsl`.
2. Import the [DHCR rent stabilized building list](https://github.com/clhenrick/dhcr-rent-stabilized-data/tree/master/csv) data into Postgres.
3. Import Properties with 421a tax exemptions data located in `data/exempt_stabilized.csv`.
4. Run the queries in `sql/likely_rent_stabilized.sql` in Postgres.
5. Export the `map_pluto_likely_rs` table as a shapefile from Postgres using `pgsql2shp`.
6. Import the shapefile to CartoDB.
7. You can now query the data using the CartoDB SQL API.

## Credits
- Big thanks to [Caroline Woolard](http://carolinewoolard.com/) for suggesting the idea to me.

- [Jue Yang](https://github.com/jueyang) designed the awesome building graphics which informed the overall redesign of version 2 of the site.

- [Eric Brelsford](http://ebrelsford.github.io/portfolio/) and [BetaNYC](http://betanyc.us/) provided motivational and technical support.

- [Radish Lab](http://radishlab.com/) contributed the design mockups for version 2.

- [John Krauss](http://blog.johnkrauss.com/) provided data for NYC properties that should have rent-stabilized apartments due to receiving tax exemptions from state programs such as 421a. (You can learn more on the the repo for [nyc-stabilization-unit-counts](https://github.com/talos/nyc-stabilization-unit-counts)).

### Fullscreen Slides with GSAP's TweenLite, CSSPlugin and ScrollToPlugin Credit
Forked from [Chrysto](http://codepen.io/bassta/)'s Pen [Fullscreen slides with TweenLite, CSSPlugin and ScrollToPlugin](http://codepen.io/bassta/pen/kDvmC/).

A [Pen](http://codepen.io/anon/pen/XJqaRg) by [Captain Anonymous](http://codepen.io/anon) on [CodePen](http://codepen.io/).

[License](http://codepen.io/anon/pen/XJqaRg/license).

## LICENSE
[Creative Commons Attribution-NonCommercial ](http://creativecommons.org/licenses/by-nc/4.0/)   
(CC BY-NC)

In other words: **_Not For Profit!_**
