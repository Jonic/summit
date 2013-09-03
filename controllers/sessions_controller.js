var User = require('../models/user');

var helpers = require('../helpers');

// GET: /signin
exports.new = function (req, res) {

	res.render('users/signin', {
		title: 'sign in to your account'
	});

};

// POST: /signin
exports.create = function (req, res, next) {

	var user = req.user;

	if (!user) {
		return res.render('users/signin', {
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
		res.render('users/signout', {
			title: 'you have now signed out'
		});
	});

};