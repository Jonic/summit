'use strict';

exports.create = function (req, res, next) {

	req.assert('username', 'Please enter your username').notEmpty();
	req.assert('password', 'Please enter your password').notEmpty();

	next();

};