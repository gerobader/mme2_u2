var express = require('express');
var app = express();


app.get('/', function(req, res){
    res.send('<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head><meta charset="utf-8"></head>' +
        '<body><h1>Hello World!</h1></body>' +
        '</html>'
    );
});

var server = app.listen(1337, function(){
    console.log('Der server hört zu O.o');
});