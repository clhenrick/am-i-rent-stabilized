import * as sql from "./sql";
import { cartoV3RentStabilizedTableName } from "../constants/config";

describe("utils/sql", () => {
  test("rentStabilizedBblSql", () => {
    const result = sql.rentStabilizedBblSql("999999999");
    expect(result).toBe(
      `SELECT bbl FROM ${cartoV3RentStabilizedTableName} WHERE bbl = 999999999`
    );
  });
});
