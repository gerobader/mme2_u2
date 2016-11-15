/** MME2 Übung 2, NodeJS server with various functions
 *  /public
 *  /
 *  /time
 *  /file.txt
 *
 * @author Jonathan Kofahl, Gero Bader, Matthaeus Kuc
 *
 */
var express = require('express');
var app = express();

/**
 * /public return the website from task 1
 */
app.use('/public', express.static('static'));

/**
 * / returns a Hello World Site with every request
 */
app.get('/', function (req, res) {
    res.send('<!DOCTYPE html>' + 
        '<html lang="en">' +
        '<head><meta charset="utf-8"></head>' + 
        '<body><h1>Hello World!</h1></body>' + 
        '</html>'
    ); 
});

app.get('/error', function(req, res){
    res.status(406);
});

/**
 * /time returns the current Systemtime as text
 */
app.get('/time', function (req, res, next) {
    var currentDate = new Date();
    res.set('Content-Type', 'text/plain');
    res.send(currentDate.getHours() + ":" + currentDate.getMinutes()  );
});

/**
 * /file reads the content of "file.txt" and returns it and the time used to read it in nanoseconds
 */
app.get('/file.txt', function (req, res, next) {

    var fs = require('fs');
    var time = process.hrtime();
    var difference;
    var fileText;


    /**
     * handler to read a text file
     */
    fs.readFile('file.txt', 'utf8', function(err, contents) {
        fileText = contents;
        difference = process.hrtime(time);
        res.send(fileText + " " + (difference[0]*1e9+difference[1]));
    });

});

/**
 * starts the server
 */
var server = app.listen(3000, function () {
    console.log('helloworld app is ready and listening at http://localhost:3000');
});