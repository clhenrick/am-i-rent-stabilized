import { rewind } from "@turf/rewind";

/**
 * @typedef {object} Row
 * @property {string} geojson
 */

/**
 * @typedef {object} Feature
 * @property {string} type
 * @property {object} properties
 * @property {object} geometry
 */

/**
 * converts Carto SQL API stringified GeoJSON geometries to an array of GeoJSON features
 * @param {Row[]} rows - query rows result
 * @returns {Feature[]}
 */
export function parseTransformRsGeomQueryResult(rows) {
  const features = rows
    .filter((d) => typeof d.geojson === "string" && d.geojson.length)
    .map((d) =>
      rewind(
        {
          type: "Feature",
          // TODO: include `id` here?
          properties: {},
          geometry: JSON.parse(d.geojson),
        },
        { reverse: true },
      ),
    );
  return features;
}
