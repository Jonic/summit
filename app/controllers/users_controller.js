var User = require('../models/user');

var helpers = require('../helpers/_index');

// GET /signup
exports.new = function (req, res) {

	res.render('users/new', {
		title: 'sign up for DiaryApp'
	});

};

// POST /signup
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

// GET /your-profile
exports.show = function (req, res) {

	res.render('users/show', {
		title: 'Your Account'
	});

};

// GET /your-profile/edit
exports.edit = function (req, res) {

	res.render('users/edit', {
		title: 'Edit Your Account'
	});

};

// PATCH/PUT /your-profile/edit
exports.update = function (req, res) {

	res.redirect('/your-profile');

};

// PATCH/PUT /your-profile/change-password
exports.update = function (req, res) {

	res.redirect('/your-profile');

};

// DELETE /users/1
exports.destroy = function (req, res) {

};