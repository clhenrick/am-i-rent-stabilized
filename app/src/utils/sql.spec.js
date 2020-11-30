import * as sql from "./sql";
import { rentStabilizedTable } from "../constants/config";

describe("utils/sql", () => {
  test("rentStabilizedBblSql", () => {
    const result = sql.rentStabilizedBblSql("999999999");
    expect(result).toBe(
      `SELECT bbl FROM ${rentStabilizedTable} WHERE bbl = 999999999`
    );
  });

  test("mapsApiSql", () => {
    const result = sql.mapsApiSql();
    expect(result).toBe(
      `SELECT the_geom_webmercator FROM ${rentStabilizedTable}`
    );
  });
});
