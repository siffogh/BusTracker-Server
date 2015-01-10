var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Bus = require('./bus-model');
var User = require('./user-model');
var Driver = require('./driver-model');
var tripSchema = mongoose.Schema({
	active: {type: Boolean, default: false}, // Tells if trip is currently active
	direction: String,                  //Direction can be two words either "pick up" (pick up students from their homes) or "deposit"
	driver : { type: Schema.Types.ObjectId, ref: 'Driver' }, //The driver of the bus 
	delay: Number,
	users: [{type: Schema.Types.ObjectId, ref: 'User' }] //Users of the bus
});

module.exports = mongoose.model('Trip', tripSchema);