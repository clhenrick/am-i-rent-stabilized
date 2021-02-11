# 421a Service

This service gathers data on NYC buildings that have a 421a tax exemption status using [Python scripts developed by Atul Varma](https://github.com/toolness/nyc-421a-xls). The output is a single CSV file `data/421a.csv`.

## Usage

To build the image using Docker:

```bash
docker build -t clhenrick/python:3.7-slim .
```

To run the container from the image:

```bash
# make sure the bash script is executable
chmod +ux init.sh

# run the container using a bind volume, output files will be in data/
docker run -it --rm -v $(pwd):/home/data clhenrick/python:3.7-slim
```
