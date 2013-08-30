var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Entry = require('./entry');

var diarySchema = new Schema({
	name: {
		default: 'My Diary',
		type: String
	},
	entries: [Entry]
});

module.exports = diarySchema;