var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Notification = require('./notification-model');
var userSchema = mongoose.Schema({
username : {type: String, default : 'Username'},
settings:{
	currentLocation:{type: Boolean, default: false},
	homeAddress: {
		lat: Number,
		lng: Number
	},
	ttn: [{ type: String, default: '5 min' }]  // ttn = time to be notified in min
},
status: String,
notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }]
});

module.exports = mongoose.model('User', userSchema);