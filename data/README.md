# "Am I Rent Stabilized?" Data Processing

This repository contains procedural code for generating data on New York City properties that are _likely_ to have rent-stabilized apartments (the word "likely" is important as there is no official public / government sanctioned data set on NYC apartments that have rent stabilized units).

This data is used for the backend database of the ["Am I Rent Stabilized?" website](https://amirentstabilized.com). As such the data is created and stored in a PostgreSQL database with the PostGIS extension, but may be exported from the database as an SQL or CSV file to be used elsewhere.

## Developer Instructions

The following assumes that you are familiar with using the following software: terminal / command line interface, Docker, and PostgreSQL.

### System Requirements

The goal of this ETL pipeline is to reduce the number of dependencies that are required to be installed on your local machine by using Docker containers for running scripts, SQL, etc. As such it requires that you have Docker (Community Edition) installed on your machine.

Requirements:

- Docker (Community Edition) >= v19.x

- `wget` for downloading MapPLUTO data

- `make` v4.x for running the Makefile

- ~6GB hard drive space for Docker images, containers, and data files.

### Data Creation and Removal

To create the `airs` database with the `likely_rs` table from scratch run:

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

- Note that when the `airs-data-db` container is first run it will take some time to create the db table `likely_rs`. Subsequent container runs should be much shorter given that the data will be persisted in the `airs-data-db` volume.

## Acknowledgements

- Python scripts for downloading and parsing data on buildings with 421a tax exemptions courtesy of [Atul Varma's nyc-421a-xls repo](https://github.com/toolness/nyc-421a-xls).
