var User = require('../models/user');

var helpers = require('../helpers');

// GET: /signin
exports.new = function (req, res) {

	res.render('sessions/new', {
		title: 'sign in to your account'
	});

};

// POST: /signin
exports.create = function (req, res, next) {

	var user = req.user;

	if (!user) {
		return res.render('sessions/new', {
			title: 'USER DOES NOT EXIST'
		});
	}

	var password = req.body.password;

	helpers.password.hash(password, user.password.salt, function (err, hash) {
		if (err) {
			return fn(err);
		}

		if (hash === user.password.hash) {
			return helpers.authentication.setAuthenticatedUser({
				loggedin: true,
				firstName: user.firstName,
				username: user.username
			}, req, res, function (req, res) {
				res.redirect('/dashboard');
			});
		}

		res.redirect('/signin');
	});

};

// GET: /signout
exports.destroy = function (req, res) {

	helpers.authentication.clearAuthenticatedUser(req, res, function () {
		res.render('sessions/destroy', {
			title: 'you have now signed out'
		});
	});

};