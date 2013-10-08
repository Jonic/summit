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

	var errors = req.validationErrors();

	if (errors) {
		return res.render('sessions/new', {
			alert: {
				className: 'warning',
				title: 'Can not do that!',
				description: 'there were errors there',
				errors: errors
			},
			page: {
				title: 'You are an idiot'
			}
		});
	}

	var user = req.user;

	if (!user) {
		return res.render('sessions/new', {
			alert: {
				className: 'warning',
				title: 'User Not Found!',
				description: 'there were errors there',
				errors: errors
			},
			page: {
				title: 'User Does Not Exist'
			}
		});
	}

	var password = req.body.password;

	helpers.password.hash(password, user.password.salt, function (err, hash) {
		req.assert(hash, 'Invalid password fool').equals(user.password.hash);

		errors = req.validationErrors();

		if (!errors) {
			return res.render('sessions/new', {
				alert: {
					className: 'warning',
					title: 'User Not Found!',
					description: 'there were errors there',
					errors: errors
				},
				page: {
					title: 'Crap Password'
				}
			});
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