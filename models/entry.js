var mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
	date: {
		type: Date,
		default: Date.now
	},
	content: String
});

module.exports = mongoose.model('Entry', entrySchema);