var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Notification = require('./notification-model');
var driverSchema = mongoose.Schema({
username : {type: String, default : 'Username'},
fullName: {type: String, default : 'Full Name'},
phone:     String
});

module.exports = mongoose.model('Driver', driverSchema);