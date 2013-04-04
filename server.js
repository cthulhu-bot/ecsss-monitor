var express = require('express');
var mongoose = require('mongoose');
var wines = require('./routes/wines');
var app = express();

try {
  mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback() {
    var wine = mongoose.Schema({
      name:  String
    })
  });
}
catch(err) {
  alert("Error: " + err.message);
}
app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);


// Prior to removing routing into route folder
//app.get('/wines', function(req, res) {
//    res.send([{name:'wine1'}, {name:'wine2'}]);
//});
//app.get('/wines/:id', function(req, res) {
//    res.send({id:req.params.id, name:  "SHIT WINE", description:  "THE SHITTIEST WINE"});
//});

// Default server build
//var http = require('http');
//http.createServer(function (req, res) {
//    res.writeHead(200, {'Content-Type': 'text/plain'});
//    res.end('Hello World\n');
//}).listen(3000, '127.0.0.1');
//console.log('Server running at http://127.0.0.1:3000/');

app.listen(3000);
console.log('Listening on port 3000...');
