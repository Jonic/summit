'use strict';

var crypto = require('crypto');

exports.hash = function (password, salt, next) {

	var length = 128;
	var iterations = 12000;

	if (3 === arguments.length) {
		crypto.pbkdf2(password, salt, iterations, length, function (err, hash) {
			next(err, (new Buffer(hash, 'binary')).toString('base64'));
		});
	} else {
		next = salt;

		crypto.randomBytes(length, function (err, salt) {
			if (err) {
				return next(err);
			}

			salt = salt.toString('base64');

			crypto.pbkdf2(password, salt, iterations, length, function (err, hash) {
				if (err) {
					return next(err);
				}

				next(null, salt, (new Buffer(hash, 'binary')).toString('base64'));
			});
		});
	}

};