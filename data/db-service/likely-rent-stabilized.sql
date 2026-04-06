BEGIN;
DROP TABLE IF EXISTS likely_rs;
CREATE TABLE likely_rs (
  bbl numeric primary key,
  address varchar,
  unitsres integer,
  borough varchar,
  ownername varchar,
  zipcode integer,
  yearbuilt smallint,
  geom geometry(MultiPolygon, 4326),
  cd smallint,
  council smallint,
  registered boolean,
  exemptions varchar
);

-- First, query the NYC MapPLUTO data for all tax lots with buildings
-- built before 1974, with 6 or more units, not owned by NYCHA, and
-- not in a building that is a co-op or contains condos.
INSERT INTO likely_rs
SELECT
  bbl,
  address,
  unitsres,
  borough,
  ownername,
  zipcode,
  yearbuilt,
  geom,
  cd,
  council,
  registered,
  exemptions
FROM (
    SELECT
      a.*,
      FALSE as registered,
      NULL as exemptions
    FROM (
        SELECT
          *
        FROM mappluto
        WHERE
          yearbuilt < 1974
          AND unitsres >= 6
          AND ownername NOT ILIKE 'new york city housing authority'
          AND ownername NOT ILIKE 'nyc housing authority'
          AND ownername NOT ILIKE 'nycha'
          AND bldgclass NOT ILIKE 'r%'
      ) as a
  ) as _;

--- insert and update tax subsidized properties
INSERT INTO likely_rs
SELECT
  bbl,
  address,
  unitsres,
  borough,
  ownername,
  zipcode,
  yearbuilt,
  geom,
  cd,
  council,
  registered,
  exemptions
FROM (
  SELECT
    a.*,
    FALSE as registered,
    sub_subsidy_name as exemptions
  FROM mappluto a,
  (
    SELECT DISTINCT ON (ref_bbl) ref_bbl, sub_subsidy_name, end_date
    FROM tax_subsidies
    WHERE sub_subsidy_name IN ('421-a Tax Incentive Program', 'J-51 Tax Incentive')
    ORDER BY ref_bbl, end_date desc
  ) b
  WHERE a.bbl = b.ref_bbl
) as _
ON CONFLICT (bbl)
DO UPDATE SET exemptions = EXCLUDED.exemptions;

CREATE INDEX likely_rs_bbl_idx ON "likely_rs" (bbl);
CREATE INDEX likely_rs_geom_idx ON "likely_rs" USING GIST ("geom");
COMMIT;
ANALYZE "likely_rs";
