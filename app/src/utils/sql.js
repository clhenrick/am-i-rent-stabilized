import { rentStabilizedTable } from "../constants/config";

export const rentStabilizedBblSql = (bbl) =>
  `SELECT bbl FROM ${rentStabilizedTable} WHERE bbl = ${bbl}`;
