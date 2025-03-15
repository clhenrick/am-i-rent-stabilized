import {
  cartoV3RentStabilizedTableName,
  cartoV3TenantsRightsServiceAreasTable,
} from "../constants/config";

const searchResultBufferDistance = 500; // meters

export const rentStabilizedBblSql = (bbl) =>
  `SELECT bbl FROM ${cartoV3RentStabilizedTableName} WHERE bbl = ${bbl}`;

export const rentStabilizedGeomSql = ({ lon, lat }) =>
  `SELECT ST_ASGEOJSON(geom) as geojson
		FROM ${cartoV3RentStabilizedTableName}
		WHERE ST_DWithin(geom, ST_GeogFromText('POINT(${lon} ${lat})'), ${searchResultBufferDistance})`;

export const tenantsRightsGroupsSql = ({ lon, lat }) =>
  `SELECT
    name,
    full_address,
    email,
    phone,
    description,
    service_area,
    website_url
  FROM ${cartoV3TenantsRightsServiceAreasTable}
  WHERE ST_Contains(
    geom,
    ST_GeogFromText(
      'POINT(' || ${lon} || ' ' || ${lat} ||  ')'
    )
  )`;
