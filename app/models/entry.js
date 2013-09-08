var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entrySchema = new Schema({
	content: {
		required: true,
		type: String
	},
	date: {
		default: Date.now,
		type: Date
	}
});

entrySchema.virtual('niceDate').get(function () {
	var moment = require('moment');

	return moment(this.date.toString()).format('dddd, MMMM Do YYYY, h:mma');
});

entrySchema.virtual('permalink').get(function () {
	return '/entry/' + this._id;
});

entrySchema.virtual('editlink').get(function () {
	return this.permalink + '/edit';
});

entrySchema.virtual('deletelink').get(function () {
	return this.permalink + '/delete';
});

module.exports = entrySchema;