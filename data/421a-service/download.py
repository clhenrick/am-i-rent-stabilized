from pathlib import Path
import requests
from bs4 import BeautifulSoup


MY_DIR = Path(__file__).parent.resolve()

DATA_DIR = MY_DIR / 'data'

DATA_DIR.mkdir(exist_ok=True)

ORIGIN = "https://www1.nyc.gov"

HTML_URL = f'{ORIGIN}/site/finance/benefits/benefits-421a.page'


def download():
    print("Retrieving list of XLS files...")
    response = requests.get(HTML_URL)
    soup = BeautifulSoup(response.content, features="html.parser")
    for link in soup.find_all('a'):
        href = link.attrs.get('href', '')
        if href.startswith('/') and (href.endswith('.xlsx') or href.endswith('.xls')):
            filename = href.split('/')[-1]
            outpath = DATA_DIR / filename
            if outpath.exists():
                print(f"Skipping {filename} (it appears to be downloaded).")
            else:
                print(f"Downloading {filename}.")
                response = requests.get(f'{ORIGIN}{href}')
                outpath.write_bytes(response.content)
    print("Done.")


if __name__ == '__main__':
    download()
