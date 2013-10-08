'use strict';

var User = require('../models/user');

exports.get = function (req, res, next) {

	var username = req.username || req.param('username');

	User.findOne({
		username: {
			$regex: new RegExp("^" + username, "i")
		}
	}, function (err, user) {
		if (user) {
			req.username = user.username;
			req.user = user;
			req.diary = user.diary[0];
			req.entries = user.diary[0].entries.reverse();

			req.diary.isOwner = req.session.auth ? (user.username === req.session.auth.username) : false;
		}

		next();
	});

};

exports.setAuthenticatedUsernameForLookup = function (req, res, next) {

	req.username = req.session.auth.username;

	next();

};

exports.ensureAuthorised = function (req, res, next) {

	if (req.username !== req.session.auth.username) {
		return res.redirect('/not-authorised');
	}

	next();

};

exports.ensurePublicAccount = function (req, res, next) {

	if (req.user.privateAccount) {
		return res.redirect('/diary/private-account');
	}

	next();

};