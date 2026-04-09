# "Am I Rent Stabilized?" Data Processing

This directory contains procedural code for generating data on New York City residential properties that are _likely_ to have rent-stabilized apartments. The word "likely" is important as there is no official public / government sanctioned data on NYC apartments that have rent stabilized units. This data is only an _estimate_ and not exact.

This data is used for the backend database of the ["Am I Rent Stabilized?" website](../website/). The data is created and stored in a PostgreSQL database with the PostGIS extension, but may be exported from the database to be used elsewhere.

## Developer Instructions

The following assumes that you are familiar with using the command line interface, Docker, and PostgreSQL.

> [!NOTE]
> The Docker commands in the Makefile assume `--platform=linux/amd64` for compatibility with Apple Silicon hardware. If you are on a different OS or Mac Intel then you will likely need to change this.

> [!NOTE]
> The Docker [`postgis/postgis` image](https://hub.docker.com/r/postgis/postgis/) builds off the official Docker [`postgres` image](https://hub.docker.com/_/postgres). According to the documentation for the `postgres` image, any executable shell scripts placed in the `/docker-entrypoint-initdb.d` directory will be run after the PostgreSQL database starts up. For this reason the `init-db.sh` script is copied to this directory and made executable so that the `likely_rs` table may be built at the appropriate time after the `airs-data-db` Docker container has been created and the PostgreSQL database has been started. Attempting to run the `init-db.sh` script using `CMD` or `ENTRYPOINT` in the Dockerfile will interfere with starting the PostgreSQL database.

### System Requirements

The following system requirements are necessary for running the likely rent stabilized data ETL pipeline.

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) >= v4.66.0

- `wget` for downloading data files

- `make` v4.x for running the Makefile. Consider using [`remake`](https://remake.readthedocs.io/en/remake-4-4/), a more modern version of Make with built in debugging.

- ~6GB hard drive space for Docker images, containers, and data files.

### Data Creation and Removal

To create the Am I Rent Stabilized (`airs`) PostgreSQL database with the `likely_rs` table, run:

```bash
make all
```

To clean up / remove everything do:

```bash
make clean
```

### Copying data to your local machine

Here are two methods for getting the likely rent-stabilized (`likely_rs`) table out of the running `airs-data-db` Docker container to your local machine.

Note that you may also connect directly to the Docker container's PostgreSQL database using software such as [QGIS](https://qgis.org). There is a [tutorial on OSGeo](https://video.osgeo.org/w/9cZiX3fMCtpPwhZgRw3oqa) which demonstrates how to do this.

#### Method 1: SQL Dump

To get a copy of the `likely_rs` table in SQL format from the `airs-data-db` Docker container after it has been created:

1. Create the `likely_rs_table_dump.sql` in the `airs-data-db` Docker container using `pg_dump`

   ```bash
   docker exec -i airs-data-db bash -c "pg_dump -U postgres -d airs -t likely_rs > likely_rs_table_dump.sql"
   ```

2. Copy the `likely_rs_table_dump.sql` file to the host machine's current directory

   ```bash
   docker cp airs-data-db:/home/data/likely_rs_table_dump.sql $(pwd)
   ```

The `likely_rs_table_dump.sql` file may then be used to create the `likely_rs` table in the desired PostgreSQL, PostGIS enabled database. It assumes that the db schema is `public` and the db owner is `postgres`.

#### Method 2: Shapefile Dump

To get a copy of the `likely_rs` table in Shapefile format from the `airs-data-db` Docker container after it has been created:

1. Create the Shapefile in the `airs-data-db` Docker container using `pgsql2shp`

   ```bash
   docker exec -i airs-data-db bash -c "pgsql2shp -f nyc_likely_rs_2025.shp -u postgres airs 'select * from likely_rs'"
   ```

2. Copy the Shapefile from the `airs-data-db` Docker container to the host machine's current directory

   ```bash
   docker exec airs-data-db bash -c "ls /home/data/nyc_likely_rs*" | while read line; do docker cp airs-data-db:/$line $(pwd); done
   ```

## Other Data Processing Notes

When the `airs-data-db` container is first run it will take some time to create the `likely_rs` table. Subsequent container runs should be much faster given that the data will be persisted in the `airs-data-db` volume.

> [!TIP]
> In Docker Desktop, view the `airs-data-db` container's logs to see when the `likely_rs` table has finished being built.
