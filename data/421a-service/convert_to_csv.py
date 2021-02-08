import os
import xlrd
import csv

from download import DATA_DIR

# Set the MAX_ROWS environment variable for easy testing.
MAX_ROWS = int(os.environ.get('MAX_ROWS', '0'))

if MAX_ROWS == 0:
    MAX_ROWS = float('inf')

OUTFILE = DATA_DIR / "421a.csv"

# These are present in the filenames and captured in the "BOROUGH NAME"
# field in the final CSV.
BOROUGHS = [
    'manhattan',
    'queens',
    'statenisland',
    'brooklyn',
    'bronx'
]

# These are just the columns from the Excel spreadsheets, we add a
# few to the final CSV.
COLUMNS = [
    "BOROUGH",
    "NEIGHBORHOOD",
    "BUILDING CLASS CATEGORY",
    "TAX CLASS AT PRESENT",
    "BLOCK",
    "LOT",
    "BUILDING CLASS AT PRESENT",
    "ADDRESS",
    "ZIP CODE",
    "RESIDENTIAL UNITS",
    "COMMERCIAL UNITS",
    "TOTAL UNITS",
    "LAND SQUARE FEET",
    "GROSS SQUARE FEET",
    "YEAR BUILT"
]


def parse_filename(name):
    '''
    Parse a downloaded filename, returning a (years, borough) tuple
    if it is a filename that represents 421a properties data for
    a borough:

        >>> parse_filename('421a_1415_queens.xls')
        ('1415', 'queens')

    The very first years of data from 2013-2014 don't have year
    information in them, so we have to special-case them:

        >>> parse_filename('bronx_421a.xls')
        ('1314', 'bronx')

    If the file doesn't represent data for a borough, it will
    return (None, None):

        >>> parse_filename('.DS_Store')
        (None, None)

        >>> parse_filename('some_other_downloaded_file.xls')
        (None, None)
    '''

    if not (name.endswith('.xlsx') or name.endswith('.xls')):
        return None, None
    bmatches = [borough for borough in BOROUGHS if borough in name]
    if not bmatches:
        return None, None
    borough = bmatches[0]
    parts = name.split('_')
    if len(parts) == 2:
        # This is the 2013-2014 year, formatted as '<BOROUGH>_421a.xls'.
        return ('1314', borough)
    # This is a later year, formatted as '421a_<YEARS>_<BOROUGH>.xlsx'.
    return (parts[1], borough)


def itersheetrows():
    '''
    Yields an iterator that combines the rows from all
    downloaded Excel files.

    It adds two extra columns for the years and borough, which
    are inferred from the filename.

    For example:

        >>> rows = itersheetrows()
        >>> next(rows)
        ['YEARS', 'BOROUGH NAME', 'BOROUGH', 'NEIGHBORHOOD', 'BUILDING CLASS CATEGORY',
         'TAX CLASS AT PRESENT', 'BLOCK', 'LOT', 'BUILDING CLASS AT PRESENT', 'ADDRESS',
         'ZIP CODE', 'RESIDENTIAL UNITS', 'COMMERCIAL UNITS', 'TOTAL UNITS',
         'LAND SQUARE FEET', 'GROSS SQUARE FEET', 'YEAR BUILT']
        >>> next(rows)
        ['1415', 'bronx', 2.0, 'BATHGATE                 ',
         '03  3-FAMILY                                ',
         1.0, 3030.0, 157.0, 'C0', '410 EAST 183 STREET                      ',
         10458.0, 3.0, 0.0, 3.0, 2000.0, 4872.0, 2005.0]

    By '1415' we mean that the row represents data from the 2014-2015 fiscal year.
    '''

    yield ['YEARS', 'BOROUGH NAME'] + COLUMNS

    for f in DATA_DIR.glob('*'):
        years, borough = parse_filename(f.name)
        if borough is None:
            continue
        xlsfile = f
        book = xlrd.open_workbook(str(xlsfile))
        for sheet in book.sheets():
            found = False
            for i in range(min(sheet.nrows, MAX_ROWS)):
                row = sheet.row(i)
                rowvals = [cell.value for cell in row]
                if COLUMNS == rowvals:
                    found = True
                elif found:
                    yield [years, borough] + rowvals
                elif i > 5:
                    raise Exception(
                        f"Header row was not found in {xlsfile.name} sheet '{sheet.name}'!"
                    )


if __name__ == '__main__':
    with OUTFILE.open('w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        rownum = 0
        for row in itersheetrows():
            print(f"Writing row {rownum}.")
            writer.writerow(row)
            rownum += 1
