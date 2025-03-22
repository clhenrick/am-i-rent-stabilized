import * as sql from "./sql";
import {
  cartoV3RentStabilizedTableName,
  cartoV3TenantsRightsServiceAreasTable,
} from "../constants/config";

describe("utils/sql", () => {
  test("rentStabilizedBblSql", () => {
    const result = sql.rentStabilizedBblSql("999999999");
    expect(result).toBe(
      `SELECT bbl FROM ${cartoV3RentStabilizedTableName} WHERE bbl = 999999999`
    );
  });

  test("rentStabilizedGeomSql", () => {
    const [lon, lat] = [-73, 40];
    const result = sql.rentStabilizedGeomSql({ lon, lat });
    expect(result).toBe(
      `SELECT ST_AsGeoJSON(geom) as geojson FROM ${cartoV3RentStabilizedTableName} WHERE ST_DWithin( geom, ST_GeogFromText( 'POINT(' || ${lon} || ' ' || ${lat} ||')' ), 500 )`
    );
  });

  test("tenantsRightsGroupsSql", () => {
    const [lon, lat] = [-73, 40];
    const result = sql.tenantsRightsGroupsSql({ lon, lat });
    expect(result).toBe(
      `SELECT name, full_address, email, phone, description, service_area, website_url FROM ${cartoV3TenantsRightsServiceAreasTable} WHERE ST_Contains( geom, ST_GeogFromText( 'POINT(' || ${lon} || ' ' || ${lat} ||  ')' ) )`
    );
  });
});
