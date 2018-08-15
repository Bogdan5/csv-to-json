const http = require('http');

const url = 'https://prod-edxapp.edx-cdn.org/assets/';
url += 'courseware/v1/07d100219da1a726dad5eddb090fa215/';
url += 'asset-v1:Microsoft+DEV283x+2T2018+type@asset+block/customer-data.csv';
let rawData = '';
const fetchCSV = (urlA, callback) => {
  http.get(urlA, (response) => {
    response.on('data', (chunk) => {
      rawData += chunk;
    });
    response.on('end', (response) => {
      console.log('End stream');
      callback(null, rawData);
    });
  }).on('error', (error) => {
    console.log(`Error: ${error.message}`);
    callback(error);
  });
}



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
