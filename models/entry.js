var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entrySchema = new Schema({
	date: {
		default: Date.now,
		type: Date
	},
	content: {
		required: true,
		type: String
	}
});

entrySchema.virtual('niceDate').get(function () {
	var moment = require('moment');

	return moment(this.date.toString()).format('dddd, MMMM Do YYYY, h:mma');
});

module.exports = entrySchema;