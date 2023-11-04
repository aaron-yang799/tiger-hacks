const fs = require('fs');


//would retrieve url from the extension
const urls = [
    "https://www.buzzfeed.com/mychalthompson/travis-kelce-taylor-swift-love-question-reactions?origin=spl",
];

// turn urls into csv format
const csvData = urls.map((url) => [url].join(','));

//save csv data to a file
fs.writeFileSync('urls.csv', 'URL\n' + csvData.join('\n'));

