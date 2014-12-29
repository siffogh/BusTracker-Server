///*********************************************************************************///
///********************************* Configuration *********************************///
///*********************************************************************************///

var express = require('express');
var key = 'AIzaSyDNcANNVuMQChxW4XnQwqrPkeTipIBJY8c'; //Google Distance Matrix Server Key
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var http = require('http');
var server = http.createServer(app);
var morgan = require('morgan');
var mongoose = require('mongoose');
var DBconfig = require('./config/database.js');
mongoose.connect(DBconfig.uri);
app.use(bodyParser.urlencoded({
  extended: true
}))
.use(bodyParser.json());
require('./config/routes.js')(app);
server.listen(8001, function () {
  console.log('Listening on 8001');
});
