#!/bin/bash

set -e

psql -d $POSTGRES_DB -U $POSTGRES_USER -f /home/data/mappluto.sql
psql -d $POSTGRES_DB -U $POSTGRES_USER -f /home/data/421a_exemptions.sql
psql -d $POSTGRES_DB -U $POSTGRES_USER -f /home/data/j51_exemptions.sql
psql -d $POSTGRES_DB -U $POSTGRES_USER -f /home/data/likely-rent-stabilized.sql

exit