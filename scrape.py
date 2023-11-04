import requests
from bs4 import BeautifulSoup

url = "https://www.buzzfeed.com/mychalthompson/travis-kelce-taylor-swift-love-question-reactions?origin=spl"
response = requests.get(url)
html_content = response.text
soup = BeautifulSoup(html_content, 'html.parser') 
print(soup.decode)


print(html_content)
