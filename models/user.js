var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
	dateJoined: Date,
	emailAddress: {
		index: {
			unique: true
		},
		required: true,
		type: String,
	},
	lastLoggedIn: Date,
	name: String,
	password: {
		hash: String,
		salt: String
	},
	username: String,
	verified: Boolean
});

module.exports = user;