#!/bin/bash

set -e

psql -d $POSTGRES_DB -U $POSTGRES_USER -f /home/data/mappluto.sql
psql -d $POSTGRES_DB -U $POSTGRES_USER -f /home/data/subsidies.sql
psql -d $POSTGRES_DB -U $POSTGRES_USER -f /home/data/likely-rent-stabilized.sql

exit
