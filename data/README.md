# "Am I Rent Stabilized?" Data Processing

This directory contains procedural code for generating data on New York City residential properties that are _likely_ to have rent-stabilized apartments (the word "likely" is important as there is no official public / government sanctioned data on NYC apartments that have rent stabilized units).

This data is used for the backend database of the ["Am I Rent Stabilized?" website](../website/). The data is created and stored in a PostgreSQL database with the PostGIS extension, but may be exported from the database to be used elsewhere.

## Developer Instructions

The following assumes that you are familiar with using the following software: terminal / command line interface, Docker, and PostgreSQL.

NOTE: The Docker commands in the Makefile assume `--platform=linux/amd64` for compatibility with Apple Silicon hardware. If you are on a different OS you will likely need to change this.

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

### Data Extraction

To get a copy of the `likely_rs` table from the database container after it is generated do:

```bash
# 1. create the likely_rs_table_dump.sql in the container
docker exec -i airs-data-db bash -c "pg_dump -U postgres -d airs -t likely_rs > likely_rs_table_dump.sql"

# 2. copy likely_rs_table_dump.sql to the host machine's current directory
docker cp airs-data-db:/home/data/likely_rs_table_dump.sql $(pwd)
```

The `likely_rs_table_dump.sql` file may then be used to create the `likely_rs` table in the desired PostgreSQL, PostGIS enabled database. It assumes that the db schema is `public` and the db owner is `postgres`.

## Data Processing Notes

Note that when the `airs-data-db` container is first run it will take some time to create the `likely_rs` table. Subsequent container runs should be much faster given that the data will be persisted in the `airs-data-db` volume.
