FROM mdillon/postgis

WORKDIR /home/data

# copy data files

COPY ./db-service/data/FC_SHD_subsidy_analysis_2025-05-13_utf8.csv /home/data/

COPY ./db-service/data/MapPLUTO.* /home/data/

# generate the mappluto create table SQL
RUN shp2pgsql -I -s 2263:4326 MapPLUTO.shp mappluto > mappluto.sql

# copy the sql files for manually creating tables
COPY ./db-service/*.sql /home/data/

# prefix the init-db script with zzz so that it runs after postgis.sh
COPY ./db-service/init-db.sh /docker-entrypoint-initdb.d/zzz-init-db.sh
