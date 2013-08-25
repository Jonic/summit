var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
	dateJoined: Date,
	emailAddress: String,
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