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

-- TODO: combine the following two insert statements into a single statement,
-- requires fixing an error on conflict update
-- Match the BBLs from properties with a 421a tax exemption
-- with those from MapPLUTO and not already in the likely_rs table
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
      a.bbl,
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
      '421-a Tax Incentive Program' as exemptions
    FROM mappluto a,
      (
        SELECT
          DISTINCT ref_bbl as bbl
        FROM tax_subsidies
        WHERE
          sub_subsidy_name = '421-a Tax Incentive Program'
      ) b
    WHERE
      a.bbl = b.bbl
  ) as _
  ON CONFLICT (bbl)
  DO UPDATE SET exemptions = '421-a Tax Incentive Program';

-- Match the BBLs from properties with a J51 tax exemption
-- with those from MapPLUTO and not already in the likely_rs table
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
      a.bbl,
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
      'J-51 Tax Incentive' as exemptions
    FROM mappluto a,
      (
        SELECT
          DISTINCT ref_bbl as bbl
        FROM tax_subsidies
        WHERE
          sub_subsidy_name = 'J-51 Tax Incentive'
      ) b
    WHERE
      a.bbl = b.bbl
  ) as _
  ON CONFLICT (bbl)
  DO UPDATE SET exemptions = 'J-51 Tax Incentive';

CREATE INDEX likely_rs_bbl_idx ON "likely_rs" (bbl);
CREATE INDEX likely_rs_geom_idx ON "likely_rs" USING GIST ("geom");
COMMIT;
ANALYZE "likely_rs";
