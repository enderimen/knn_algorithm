var fs = require('fs');
var CsvReadableStream = require('csv-reader');
 
var testStream = fs.createReadStream('test.csv', 'utf8');
var trainingStream = fs.createReadStream('training.csv', 'utf8');

var testArray = Array();
var resultArray = Array(258);
var index = 0;
var k = 8;
var kArray = Array();

for (let reset = 0; reset < 258; reset++) {
    resultArray[reset] = 0;
}
var missingDataFunctionControl = () => {
    
}

var testFunction = (index) => {
    
    testStream
    .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, delimiter:";" }))
    .on('data', (row) => {
        
        if(row[index] === '') {
            for (let i=1; i<5; i++) {
                testArray.push(parseFloat(String(row[i]).replace(",", ".")));

                trainingFunction(i, row[5]).then((resultArray) => {
                    //console.log(i +". step completed!");
                }).catch((error) => {
                    console.log("Request error: ", error);
                });
            }

            console.log("Test Array (index): " + testArray);
        }
    })
    .on('end',  (data) => {
        for (let ender = 0; ender < 258; ender++) {
            resultArray.sort();
            kArray.push(Math.sqrt(resultArray[ender]));   
            //console.log(ender +" : "+resultArray[ender]);   
        }

        for (let l = 0; l < k; l++) {
            var weightDistribution = 1/ Math.pow(kArray[l], 2);
            console.log(weightDistribution + " " + kArray[l]); 
        }
    });
}

var trainingFunction = (i, label) => {

    var cnn = 0;
    return new Promise((resolve, reject) => {
        trainingStream
        .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, delimiter:";" }))
        .on('data', (row) => {
            
            var s = parseFloat(String(row[i]).replace(",", "."));
            resultArray[cnn] += Math.abs(Math.pow((s - testArray[i-1]), 2));
            console.log("Label: " + label);
            cnn++;
        })
        .on('end', (data) => {

            resolve(resultArray);
            
        });
    });
}

testFunction(index);

