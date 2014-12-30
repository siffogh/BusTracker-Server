var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user-model');
var notificationSchema = mongoose.Schema({
	date: Date,
	content: {
		text: String,
		img: String
	},
	checked: {type: Boolean, default: false}
});

module.exports = mongoose.model('Notification', notificationSchema);