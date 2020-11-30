import { rentStabilizedTable } from "../constants/config";

export const rentStabilizedBblSql = (bbl) =>
  `SELECT bbl FROM ${rentStabilizedTable} WHERE bbl = ${bbl}`;

export const mapsApiSql = () =>
  `SELECT the_geom_webmercator FROM ${rentStabilizedTable}`;
