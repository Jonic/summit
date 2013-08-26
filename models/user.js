var diarySchema = require('./diary');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	dateJoined: {
		default: Date.now,
		type: Date
	},
	diary: [diarySchema],
	email: {
		index: {
			unique: true
		},
		required: true,
		type: String
	},
	lastLoggedIn: {
		default: Date.now,
		type: Date
	},
	name: String,
	password: {
		hash: {
			required: true,
			type: String
		},
		salt: {
			required: true,
			type: String
		}
	},
	username: {
		index: {
			unique: true
		},
		required: true,
		type: String
	}
});

userSchema.virtual('firstName').get(function () {
	return this.name.split(' ')[0];
});

module.exports = mongoose.model('User', userSchema);