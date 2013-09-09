'use strict';

var helpers = require('../helpers/_index');

// GET: /signin
exports.new = function (req, res) {

	res.render('sessions/new', {
		page: {
			title: 'Sign In'
		},
		redirectDestination: req.session.redirectDestination
	});

	delete req.session.redirectDestination;

};

// POST: /signin
exports.create = function (req, res) {

	var user = req.user;

	if (!user) {
		return res.render('sessions/new', {
			page: {
				title: 'User Does Not Exist'
			}
		});
	}

	var password = req.body.password;

	helpers.password.hash(password, user.password.salt, function (err, hash) {
		if (err) {
			throw err;
		}

		if (hash !== user.password.hash) {
			res.redirect('/signin');
		}

		helpers.authentication.setAuthenticatedUser({
			loggedin: true,
			firstName: user.firstName,
			username: user.username
		}, req, res, function (req, res) {
			res.redirect(req.body.redirectDestination || '/dashboard');
		});
	});

};

// GET: /signout
exports.destroy = function (req, res) {

	helpers.authentication.clearAuthenticatedUser(req, res, function () {
		res.render('sessions/destroy', {
			page: {
				title: 'Goodbye'
			}
		});
	});

};