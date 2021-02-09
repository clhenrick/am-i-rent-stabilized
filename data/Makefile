# set defaults (see: https://tech.davis-hansson.com/p/make/)
SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

# tell Make to use `>` instead of tabs to specify indentation 
# see: https://tech.davis-hansson.com/p/make/
ifeq ($(origin .RECIPEPREFIX), undefined)
  $(error This Make does not support .RECIPEPREFIX. Please use GNU Make 4.0 or later)
endif
.RECIPEPREFIX = >

# MapPLUTO data
MAPPLUTO_DATA_VERSION := "20v8"
MAPPLUTO_DATA_FILE := "nyc_mappluto_$(MAPPLUTO_DATA_VERSION)_shp.zip"
MAPPLUTO_DATA_URI := "https://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/$(MAPPLUTO_DATA_FILE)"

# J51 exemption data
J51_DATA_URI := "https://data.cityofnewyork.us/api/views/y7az-s7wc/rows.csv?accessType=DOWNLOAD"

# Postgres
POSTGRES_PASSWORD := "postgres"
POSTGRES_USER := "postgres"
POSTGRES_DB := "airs"

# db-service/.build.sentinel has a lot of dependencies, listing them here for readability
DB_SERVICE_BUILD_DEPS := db-service/.volume.sentinel db-service/data/MapPLUTO.shp
DB_SERVICE_BUILD_DEPS += 421a-service/data/421a.csv db-service/data/j51_exemptions.csv

.PHONY: all
all: db-service/.run.sentinel

.PHONY: clean
clean: clean-421a clean-db

.PHONY: clean-421a
clean-421a:
> @echo "Cleaning 421a service..."
> rm -rf ./421a-service/data/*
> rm -rf ./421a-service/__pycache__
> rm -f ./421a-service/.build.sentinel
ifneq ($(strip $(shell docker ps -a | grep airs-data-421a)),)
> docker stop airs-data-421a && docker rm airs-data-421a
endif
ifneq ($(strip $(shell docker images -a | grep clhenrick/python)),)
> docker image rm clhenrick/python:3.7-slim
endif

.PHONY: clean-db
clean-db:
> @echo "Cleaning db service..."
> rm -rf ./db-service/data/*
> rm -f ./db-service/.*.sentinel
ifneq ($(strip $(shell docker ps -a | grep airs-data-db)),)
> docker stop airs-data-db && docker rm airs-data-db
endif
ifneq ($(strip $(shell docker images -a | grep clhenrick/airs-data-db)),)
> docker image rm clhenrick/airs-data-db
endif
ifneq ($(strip $(shell docker volume ls | grep airs-data-db)),)
> docker volume rm airs-data-db
endif

##########################################################################################
# Database Initialization & likely_rs table creation
##########################################################################################

db-service/.run.sentinel: db-service/.build.sentinel
> @echo "Running Docker container for db-service..."
> docker run \
> --name airs-data-db \
> --env POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
> --env POSTGRES_USER=$(POSTGRES_USER) \
> --env POSTGRES_DB=$(POSTGRES_DB) \
> -v airs-data-db:/var/lib/postgresql/data \
> --restart=unless-stopped \
> clhenrick/airs-data-db
> touch $@

db-service/.build.sentinel: $(DB_SERVICE_BUILD_DEPS)
> @echo "Building Docker container for db-service..."
> docker build -t clhenrick/airs-data-db -f ./db-service/Dockerfile .
> touch $@

db-service/.volume.sentinel:
> @echo "Creating Docker volume for db-service..."
> docker volume create airs-data-db
> touch $@

##########################################################################################
# MapPLUTO data sourcing
##########################################################################################

.INTERMEDIATE: db-service/data/MapPLUTO.shp
db-service/data/MapPLUTO.shp: db-service/data/$(MAPPLUTO_DATA_FILE)
> @echo "unzipping $< to $@..."
> cd ./db-service/data
> unzip $(MAPPLUTO_DATA_FILE)
> cd ../..

.INTERMEDIATE: db-service/data/$(MAPPLUTO_DATA_FILE)
db-service/data/$(MAPPLUTO_DATA_FILE): db-service/data/.data.sentinel
> @echo "downloading $@..."
> wget --no-use-server-timestamps $(MAPPLUTO_DATA_URI) -O $@

db-service/data/.data.sentinel:
> mkdir -p db-service/data
> touch db-service/data/.data.sentinel

##########################################################################################
# J51 data sourcing and processing
##########################################################################################

db-service/data/j51_exemptions.csv:
> @echo "downloading $(notdir $@)..."
> wget --no-use-server-timestamps $(J51_DATA_URI) -O $@

##########################################################################################
# 421a data sourcing and processing
##########################################################################################

421a-service/data/421a.csv: 421a-service/.build.sentinel
> @echo "Running Docker container for 421a-service to create $@..."
> cd ./421a-service
> chmod +x init.sh
> docker run --name airs-data-421a -it --rm -v $$(pwd):/home/data clhenrick/python:3.7-slim
> cd ..

421a-service/.build.sentinel:
> @echo "Buiding Docker image for 421a-service..."
> docker build -t clhenrick/python:3.7-slim -f ./421a-service/Dockerfile ./421a-service
> touch $@