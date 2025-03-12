import {
  rentStabilizedTable,
  cartoV3RentStabilizedTableName,
  cartoV3TenantsRightsServiceAreasTable,
} from "../constants/config";

export const rentStabilizedBblSql = (bbl) =>
  `SELECT bbl FROM ${cartoV3RentStabilizedTableName} WHERE bbl = ${bbl}`;

export const mapsApiSql = () =>
  `SELECT the_geom_webmercator FROM ${rentStabilizedTable}`;

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
