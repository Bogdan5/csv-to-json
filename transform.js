const https = require('https');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

let url = 'https://prod-edxapp.edx-cdn.org/assets/';
url += 'courseware/v1/07d100219da1a726dad5eddb090fa215/';
url += 'asset-v1:Microsoft+DEV283x+2T2018+type@asset+block/customer-data.csv';
let rawData = '';
const fetchCSV = (urlA, callback) => {
  https.get(urlA, (response) => {
    response.on('data', (chunk) => {
      // console.log(chunk);
      rawData += chunk;
    });
    response.on('end', (response) => {
      console.log('End stream');
      callback(null, rawData);
    });
  }).on('error', (error) => {
    callback(error);
  });
};

fetchCSV(url, (error, rawData) => {
  if (error) {
    console.log(`Error: ${error.message}`);
  }

  fs.writeFileSync(path.join(__dirname, 'file.html'), rawData);
});

var csvData = [];
fs.createReadStream(path.join(__dirname, 'file.html'))
  .pipe(csv())
  .on('data', function (data) {
    csvData.push(data);
  })
  .on('end', function () {
    console.log('Writing file');
    fs.writeFileSync(path.join(__dirname, 'csv.txt'), csvData);
  });
