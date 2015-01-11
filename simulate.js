	var express = require('express');
	var app = express();
	var http = require('http');
	var server = http.createServer(app);
	var morgan = require('morgan');
	var DBconfig = require('./config/database.js');
	var mongoose = require('mongoose');
	var ObjectId = mongoose.Schema.Types.ObjectId;
	var bodyParser = require('body-parser');
	mongoose.connect(DBconfig.uri);
	app.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(bodyParser.json());
	server.listen(8001, function () {
		console.log('Listening on 8001');
	});

	var Trip = require('./db/models/trip-model');
	var Driver = require('./db/models/driver-model');
	var User = require('./db/models/user-model');
	var newTrip = new Trip();
	newTrip.direction = 'pick up';
	newTrip.active = false;
	newTrip.user = mongoose.Types.ObjectId("54a16261952af6840a5e02fb");
	newTrip.driver = mongoose.Types.ObjectId('54b1375d20fb86f80bdb32e1');


      newTrip.save(function(err){
        if(err)
          throw err;
      });

	// var Driver = require('./db/models/driver-model');
	// var newDriver = new Driver();
	// newDriver.username = 'azizou';
	// newDriver.fullName = 'Abdelaziz Zarouni';
	// newDriver.phone = '+971552320493';
	// newDriver.save(function(err){
	// 	if(err)
	// 		throw err;
	// });
	// var User = require('./db/models/user-model');
	// var Notification = require('./db/models/notification-model');
	// var newUser = new User();
	// newUser.username = 'siffogh';
	// newUser.save(function(err){
	// 	if(err)
	// 	{
	// 		console.log('error');
	// 		throw err;
	// 	}

	// 	else
	// 	{
	// 		console.log('inserted');
	// 		return (null,newUser);
	// 	}

	// });

	// User.findOne({'username': 'siffogh'}, function(err,user){
	// 	var notif = new Notification();
	// 	notif.date = new Date();
	// 	notif.content.text = 'The Bus is arriving in 5 min';
	// 	notif.content.img = 'arrive.jpg';
	// 	notif.save(function(err){
	// 		if(err)
	// 			throw err;
	// 	});
	// 	user.notifications.push(notif._id);
	// 	user.save(function(err){
	// 		if(err)
	// 			throw err;
	// 	});
	// });