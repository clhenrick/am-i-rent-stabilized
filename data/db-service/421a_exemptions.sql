DROP TABLE IF EXISTS exemptions_421a;

CREATE TABLE exemptions_421a (
    years numeric,
    borough_name varchar,
    borough numeric,
    neighborhood varchar,
    building_class_category varchar,
    tax_class_at_present varchar,
    block numeric,
    lot numeric,
    building_class_at_present varchar,
    address varchar,
    zipcode numeric,
    residential_units numeric,
    commercial_units numeric,
    total_units numeric,
    land_sq_ft numeric,
    gross_sq_ft numeric,
    year_built numeric
);

COPY exemptions_421a
FROM '/home/data/421a.csv'
WITH CSV HEADER;

-- correct column data types
ALTER TABLE exemptions_421a
ALTER COLUMN years type integer,
ALTER COLUMN borough type integer,
ALTER COLUMN block type integer,
ALTER COLUMN lot type integer,
ALTER COLUMN zipcode type integer,
ALTER COLUMN residential_units type integer,
ALTER COLUMN commercial_units type integer,
ALTER COLUMN total_units type integer,
ALTER COLUMN year_built type integer;

-- add column for concatenated borough, block, lot
ALTER TABLE exemptions_421a
ADD COLUMN bbl varchar,
ADD CONSTRAINT bbl CHECK (char_length(bbl) <= 10);
UPDATE exemptions_421a SET bbl = borough::text || LPAD(block::text, 5, '0') || LPAD(lot::text, 4, '0');
