var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Bus = require('./bus-model');
var User = require('./user-model');
var tripSchema = mongoose.Schema({
	direction: String,                  //Direction can be two words either "pick up" (pick up students from their homes) or "deposit"
	driver : { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Trip', tripSchema);