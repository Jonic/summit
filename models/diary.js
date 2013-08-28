var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Entry = require('./entry');

var diarySchema = new Schema({
	name: {
		required: true,
		type: String
	},
	entries: {
		type: Schema.ObjectId,
		ref: 'Entry'
	}
});

module.exports = mongoose.model('Diary', diarySchema);