///*********************************************************************************///
///********************************* Configuration *********************************///
///*********************************************************************************///

var express = require('express');
var app = express();
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
