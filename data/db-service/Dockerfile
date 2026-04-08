FROM postgis/postgis:latest

WORKDIR /home/data

# copy data files

COPY ./db-service/data/FC_SHD_subsidy_analysis_2025-05-13_utf8.csv /home/data/

COPY ./db-service/data/MapPLUTO.* /home/data/

RUN apt update
RUN apt install -y postgis
RUN which shp2pgsql

# generate the mappluto create table SQL
RUN shp2pgsql -I -s 2263:4326 MapPLUTO.shp mappluto > /home/data/mappluto.sql

# copy the sql files for manually creating tables
COPY ./db-service/*.sql /home/data/

COPY ./db-service/init-db.sh /docker-entrypoint-initdb.d
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh
