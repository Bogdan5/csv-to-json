const https = require('https');
const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');//transforms csv into JSON

let url = 'https://prod-edxapp.edx-cdn.org/assets/';
url += 'courseware/v1/07d100219da1a726dad5eddb090fa215/';
url += 'asset-v1:Microsoft+DEV283x+2T2018+type@asset+block/customer-data.csv';
let rawData = '';

//a function that downloads the csv data into a newly-created file called file.html
const fetchCSV = (urlA, callback) => {
  https.get(urlA, (response) => {
    response.on('data', (chunk) => {
      rawData += chunk;
    });
    response.on('end', (response) => {
      callback(null, rawData);
    });
  }).on('error', (error) => {
    callback(error);
  });
};

//function called
fetchCSV(url, (error, rawData) => {
  if (error) {
    console.log(`Error: ${error.message}`);
  }

  fs.writeFileSync(path.join(__dirname, 'file.html'), rawData);
});

const csvFilePath = path.join(__dirname, 'file.html');
csv()
.fromFile(csvFilePath)
.then((jsonObj) => {
  // it was necessary to stringify in order to avoid the [object, Object] format
  fs.writeFileSync(path.join(__dirname, 'csv.html'), JSON.stringify(jsonObj, null, 2));
});
