var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Notification = require('./notification-model');
var userSchema = mongoose.Schema({
username : {type: String, default : 'Username'},
settings:{
	homeAddress: {
		lat: Number,
		lng: Number
	},
	ttn: [{ type: String, default: '5 min' }]  // ttn = time to be notified in min
},

notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }]
});

module.exports = mongoose.model('User', userSchema);