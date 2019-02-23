var fs = require('fs');
var CsvReadableStream = require('csv-reader');
 
var inputStream = fs.createReadStream('training.csv', 'utf8');
 
inputStream
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', (row) => {
        console.log(row);
    })
    .on('end',  (data) => {
        console.log('End!');
    });