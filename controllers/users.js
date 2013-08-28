var User = require('../models/user');

var helpers = require('../helpers');

// GET: /signup
exports.signup = function (req, res) {

	res.render('users/signup', {
		title: 'sign up for DiaryApp'
	});

};

// POST: /signup
exports.createUser = function (req, res, next) {

	if (req.user) {
		return res.render('users/signup', {
			title: 'Email or username in use!'
		});
	}

	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;

	var user = new User({
		diary: {
			name: 'My Diary'
		},
		email: email,
		name: name,
		username: username
	});

	helpers.password.hash(password, function (err, salt, hash) {
		if (err) {
			throw err;
		}

		user.password.salt = salt;
		user.password.hash = hash;

		user.save(function (err, user) {
			if (err) {
				return next(err);
			}

			return helpers.authentication.setAuthenticatedUser({
				loggedin: true,
				firstName: user.firstName,
				username: user.username
			}, req, res, function (req, res) {
				res.redirect('/dashboard');
			});
		});
	});

};

// GET: /signin
exports.signin = function (req, res) {

	res.render('users/signin', {
		title: 'sign in to your account'
	});

};

// POST: /signin
exports.authenticateUser = function (req, res, next) {

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
exports.signout = function (req, res) {

	helpers.authentication.clearAuthenticatedUser(req, res, function () {
		res.render('users/signout', {
			title: 'you have now signed out'
		});
	});

};