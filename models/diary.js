var entrySchema = require('./entry');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var diarySchema = new Schema({
	name: {
		required: true,
		type: String
	},
	entries: [entrySchema]
});

module.exports = mongoose.model('Diary', diarySchema);