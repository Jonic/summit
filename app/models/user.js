'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Diary = require('./diary');

var userSchema = new Schema({
	diary: [Diary],
	email: {
		index: {
			unique: true
		},
		required: true,
		type: String
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
	privateAccount: {
		type: Boolean,
		default: true
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