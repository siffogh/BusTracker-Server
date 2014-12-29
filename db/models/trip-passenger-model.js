var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Bus = require('./bus-model');
var User = require('./user-model');
var Trip = require('./trip-model');
var tripPassengerSchema = mongoose.Schema({
	status: String,
	trip: { type: Schema.Types.ObjectId, ref: 'Trip' },
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('TripPassenger', tripPassengerSchema);