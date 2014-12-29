	var express = require('express');
	var app = express();
	var http = require('http');
	var server = http.createServer(app);
	var morgan = require('morgan');
	var DBconfig = require('./config/database.js');
	var mongoose = require('mongoose');
	var bodyParser = require('body-parser');
	mongoose.connect(DBconfig.uri);
	app.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(bodyParser.json());
	server.listen(8001, function () {
		console.log('Listening on 8001');
	});

	var User = require('./db/models/user-model');
	var newUser = new User();
	newUser.username = 'siffogh';
	newUser.save(function(err){
		if(err)
		{
			console.log('error');
			throw err;
		}

		else
		{
			console.log('inserted');
			return (null,newUser);
		}

	});