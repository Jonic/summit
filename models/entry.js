var mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
	date: {
		type: Date,
		default: Date.now
	},
	content: {
		required: true,
		type: String
	}
});

module.exports = entrySchema;