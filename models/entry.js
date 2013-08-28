var mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
	name: String
});

module.exports = mongoose.model('Entry', entrySchema);