var User = require('../models/user');

var helpers = require('../helpers/_index');

// GET /users
exports.index = function (req, res) {

};

// GET /users/1
exports.show = function (req, res) {

};

// GET /signup
exports.new = function (req, res) {

	res.render('users/new', {
		title: 'sign up for DiaryApp'
	});

};

// GET /users/1/edit
exports.edit = function (req, res) {

};

// POST /users
exports.create = function (req, res) {

	if (req.user) {
		return res.render('users/new', {
			title: 'Email or username in use!'
		});
	}

	var values = req.body;

	var user = new User({
		diary: [{
			entries: []
		}],
		email: values.email,
		name: values.name,
		username: values.username
	});

	helpers.password.hash(values.password, function (err, salt, hash) {
		if (err) {
			throw err;
		}

		user.password = {
			salt: salt,
			hash: hash
		};

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

// PATCH/PUT /users/1
exports.update = function (req, res) {

};

// DELETE /users/1
exports.destroy = function (req, res) {

};