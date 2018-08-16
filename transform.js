const https = require('https');
const path = require('path');
const fs = require('fs');

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
      console.log(rawData.split('/n')[0]);
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
// fs.createReadStream(req.file.path)
//     .pipe(parse({ delimiter: ':' }))
//     .on('data', function (csvrow) {
//         console.log(csvrow);
//         //do something with csvrow
//         csvData.push(csvrow);
//       })
//     .on('end', function () {
//       //do something wiht csvData
//       console.log(csvData);
//     });
