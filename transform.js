const http = require('http');
var csvData = [];
fs.createReadStream(req.file.path)
    .pipe(parse({ delimiter: ':' }))
    .on('data', function (csvrow) {
        console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);
      })
    .on('end', function () {
      //do something wiht csvData
      console.log(csvData);
    });
