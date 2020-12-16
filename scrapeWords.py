from sys import setrecursionlimit
from requests import get
from bs4 import BeautifulSoup
from json import dump

setrecursionlimit(10000)


def buildUrl(page):
    return f'http://phrontistery.info/{page}.html'


out_words = []
tmpfile = './server/words_temp.json'
output = './server/words.json'
pages = 'abcdefghijklmnopqrstuvwxyz'
urls = [buildUrl(p) for p in pages]


def parsePage(url):
    print(url)
    page = get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    table = soup.find('table', class_='words')
    rows = [r for r in table.find_all('tr')][1:]
    for i, row in enumerate(rows):
        tds = iter([td for td in row.find_all('td', limit=2)])
        word = next(tds).contents[0].strip().capitalize()
        defintion = next(tds).contents[0].strip()
        out_words.append((word, defintion))
        print('writing %04d of %04d: %s\t\t\t' %
              (i, len(rows), word), end='\r')
    print('')


for url in urls:
    parsePage(url)

with open(output, 'w') as fp:
    dump(out_words, fp, indent=2)
