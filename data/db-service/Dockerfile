FROM mdillon/postgis

WORKDIR /home/data

# copy data files

COPY ./421a-service/data/421a.csv .

COPY ./db-service/data/j51_exemptions.csv .

COPY ./db-service/data/MapPLUTO.* /home/data/

# generate the mappluto create table SQL
RUN shp2pgsql -I -s 2263:4326 MapPLUTO.shp mappluto > mappluto.sql

# copy the sql files for manually creating tables
COPY ./db-service/*.sql /home/data/

# prefix the init-db script with zzz so that it runs after postgis.sh
COPY ./db-service/init-db.sh /docker-entrypoint-initdb.d/zzz-init-db.sh
