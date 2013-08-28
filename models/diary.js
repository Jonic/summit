var mongoose = require('mongoose');

var entrySchema = require('./entry');

var diarySchema = new mongoose.Schema({
	name: {
		required: true,
		type: String
	},
	entries: [entrySchema]
});

module.exports = mongoose.model('Diary', diarySchema);