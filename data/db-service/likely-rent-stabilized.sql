BEGIN;
DROP TABLE IF EXISTS likely_rs;
CREATE TABLE likely_rs (
  bbl bigint primary key,
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
  bbl :: bigint,
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

-- 421a
-- Match the BBLs from 421a tax exempt properties with
-- those from MapPLUTO and not already in the likely_rs table
INSERT INTO likely_rs
SELECT
  bbl :: bigint,
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
      a.bbl :: bigint,
      address,
      unitsres,
      borough,
      ownername,
      zipcode,
      yearbuilt,
      geom,
      cd,
      council,
      FALSE as registered,
      '421a' as exemptions
    FROM mappluto a,
      (
        SELECT
          DISTINCT bbl
        FROM exemptions_421a
        WHERE
          bbl IS NOT NULL
      ) b
    WHERE
      substring (a.bbl :: text, 1, 10) = b.bbl
  ) as _
  ON CONFLICT (bbl)
  DO UPDATE SET exemptions = '421a';

-- J51
-- Match the BBLs from properties with a J51 tax exemption with
-- those from MapPLUTO and not already in the likely_rs table
INSERT INTO likely_rs
SELECT
  bbl :: bigint,
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
      a.bbl :: bigint,
      address,
      unitsres,
      borough,
      ownername,
      zipcode,
      yearbuilt,
      geom,
      cd,
      council,
      FALSE as registered,
      'J51' as exemptions
    FROM mappluto a,
      (
        SELECT
        DISTINCT bbl
        FROM j51_exemptions
        WHERE (init_year + ex_years) >= date_part('year', CURRENT_DATE)
        AND init_year != 9999
        AND ex_years > 0
      ) b
    WHERE
      substring (a.bbl :: text, 1, 10) = b.bbl
) as _
ON CONFLICT (bbl)
DO UPDATE SET exemptions = 'J51';

CREATE INDEX likely_rs_bbl_idx ON "likely_rs" (bbl);
CREATE INDEX likely_rs_geom_idx ON "likely_rs" USING GIST ("geom");
COMMIT;
ANALYZE "likely_rs";