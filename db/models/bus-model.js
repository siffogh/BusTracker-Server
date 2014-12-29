var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var busSchema = mongoose.Schema({
currentPosition: {
	lat: Double,
	lng: Double
}
});

module.exports = mongoose.model('Bus', busSchema);