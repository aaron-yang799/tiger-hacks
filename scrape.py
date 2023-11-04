import requests
import csv
from bs4 import BeautifulSoup


url = "https://www.buzzfeed.com/mychalthompson/travis-kelce-taylor-swift-love-question-reactions?origin=spl"
response = requests.get(url)
html_content = response.text
soup = BeautifulSoup(html_content, 'html.parser') 
print(soup.decode)

lines = html_content.split('\n')

# Now we will open a file to write into
with open('output.csv', 'w', newline='') as file:
    writer = csv.writer(file)

    # Iterate over the lines and write to the csv file
    for line in lines:
        # Split each line into fields using the comma as a delimiter
        writer.writerow(line.split(','))

print(html_content)
