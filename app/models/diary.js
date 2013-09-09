'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Entry = require('./entry');

var diarySchema = new Schema({
	entries: [Entry],
	title: {
		default: 'My Diary',
		type: String
	}
});

module.exports = diarySchema;