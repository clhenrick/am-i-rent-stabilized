import {
  rentStabilizedTable,
  cartoV3RentStabilizedTableName,
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
  FROM nyc_tenants_rights_service_areas
  WHERE ST_Contains(
    the_geom,
    ST_GeomFromText(
      'POINT(' || ${lon} || ' ' || ${lat} ||  ')',
      4326
    )
  )`;
