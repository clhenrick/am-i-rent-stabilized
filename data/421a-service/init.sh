#!/usr/bin/env bash

set -e

echo "downloading xls files..."

python download.py

echo "converting xls files to csv..."

python convert_to_csv.py

echo "done"

exit