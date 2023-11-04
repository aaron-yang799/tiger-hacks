const {
    metascraper,
    metascraperTitle,
    metascraperDescription,
    metascraperUrl,
    got,
  } = require('./es-wrapper.mjs');
  
  // Rest of your code
  

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