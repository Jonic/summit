var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Entry = require('./entry');

var diarySchema = new Schema({
	entries: [Entry],
	name: {
		default: 'My Diary',
		type: String
	}
});

module.exports = diarySchema;