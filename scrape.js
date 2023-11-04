const fs = require('fs');
const csv = require('csv-parser');
const metascraper = require('metascraper')([
  require('metascraper-title')(),
  require('metascraper-description')(),
  require('metascraper-url')()
]);
const got = require('got');

const csvFP = 'urls.csv';

fs.createReadStream(csvFP)
    .pipe(csv())
    .on('data', async (row) => {
        try {
            const targetUrl = row['URL'];

            const { body: html, url } = await got(targetUrl);
            const metadata = await metascraper({ html, url });

            console.log('Metadata for URL: ${targetUrl}');
            console.log(metadata);
        } catch (error) {
            console.error('Error processing a row:', error);
        }
    })
    .on('end', () => {
        console.log('CSV processing completed');
    });