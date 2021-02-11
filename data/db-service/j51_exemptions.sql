BEGIN;
DROP TABLE IF EXISTS j51_exemptions;
CREATE TABLE j51_exemptions (
    borough_code integer,
    block integer,
    lot integer,
    easement text,
    init_year integer,
    qtr text,
    ex_years integer,
    ab_pct numeric,
    tax_year integer,
    exempt_amt numeric,
    cost_of_alt numeric,
    abate_grant numeric,
    amt_remain numeric,
    total_tax numeric,
    abatement numeric
);

COPY j51_exemptions
FROM '/home/data/j51_exemptions.csv'
WITH CSV HEADER;

ALTER TABLE j51_exemptions
ADD COLUMN bbl char(10);

UPDATE j51_exemptions SET bbl = borough_code::text || LPAD(block::text, 5, '0') || LPAD(lot::text, 4, '0');

CREATE INDEX j51_exemptions_bbl_idx on j51_exemptions (bbl);

COMMIT;
ANALYZE "j51_exemptions";