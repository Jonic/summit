'use strict';

var User = require('../models/user');

var helpers = require('../helpers/_index');

// GET /signup
exports.new = function (req, res) {

	res.render('users/new', {
		page: {
			title: 'Create an Account'
		}
	});

};

// POST /signup
exports.create = function (req, res) {

	var values = req.body;

	var user = new User({
		diary: [{
			entries: []
		}],
		email: values.email,
		name: values.name,
		privateAccount: values.privateAccount || false,
		username: values.username
	});

	helpers.password.hash(values.password, function (err, salt, hash) {
		user.password = {
			salt: salt,
			hash: hash
		};

		user.save(function (err, user) {
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
		page: {
			title: 'Your Profile'
		}
	});

};

// GET /your-profile/edit
exports.edit = function (req, res) {

	res.render('users/edit', {
		diary: req.diary,
		page: {
			title: 'Edit Your Profile',
		},
		user: req.user
	});

};

// PATCH/PUT /your-profile/edit
exports.update = function (req, res) {

	var errors = req.validationErrors();

	if (errors) {
		return res.render('your-profile/edit', {
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
	var diary = req.diary;

	user.name = req.body.name;
	user.privateAccount = req.body.privateAccount || false;
	diary.title = req.body.diaryTitle;

	user.save(function (err) {
		if (err) {
			throw err;
		}

		res.redirect('/your-profile/edit');
	});

};

// PATCH/PUT /your-profile/change-email
exports.updateEmail = function (req, res) {

	var errors = req.validationErrors();

	if (errors) {
		return res.render('your-profile/edit', {
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

	if (user.email === req.body.email) {
		return res.redirect('/your-profile/edit');
	}

	User.findOne({
		email: {
			$regex: new RegExp("^" + req.body.email, "i")
		}
	}, function (err, userExists) {
		if (err) {
			throw err;
		}

		if (userExists) {
			return res.redirect('/your-profile/edit');
		}

		user.email = req.body.email;

		user.save(function (err) {
			if (err) {
				throw err;
			}

			return res.redirect('/your-profile/edit');
		});
	});

};

// GET /your-profile/verify-email/:key
exports.verifyEmail = function (req, res) {

	res.redirect('/your-profile');

};

// PATCH/PUT /your-profile/change-password
exports.updatePassword = function (req, res) {

	var errors = req.validationErrors();

	if (errors) {
		return res.render('your-profile/edit', {
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

	var password = req.body.password;
	var passwordNew = req.body.passwordNew;
	var passwordRepeat = req.body.passwordRepeat;
	var user = req.user;

	helpers.password.hash(password, user.password.salt, function (err, hash) {
		if (err) {
			throw err;
		}

		if (hash !== user.password.hash) {
			console.log('could not verify password');
			return res.redirect('/your-profile/edit');
		}

		if (passwordNew !== passwordRepeat) {
			console.log('passwords did not match');
			res.redirect('/your-profile/edit');
		}

		helpers.password.hash(passwordNew, function (err, salt, hash) {
			if (err) {
				throw err;
			}

			user.password = {
				salt: salt,
				hash: hash
			};

			user.save(function (err) {
				if (err) {
					throw err;
				}

				res.redirect('/your-profile/edit');
			});
		});
	});

};

// GET /your-profile/delete
exports.delete = function (req, res) {

	return res.render('users/delete');

};

// DELETE /your-profile/delete
exports.destroy = function (req, res) {

	var errors = req.validationErrors();

	if (errors) {
		return res.render('your-profile/edit', {
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
	var password = req.body.password;

	helpers.password.hash(password, user.password.salt, function (err, hash) {
		if (err) {
			throw err;
		}

		if (hash !== user.password.hash) {
			res.redirect('/your-profile/edit');
		}

		user.remove(function (err) {
			if (err) {
				throw err;
			}

			helpers.authentication.clearAuthenticatedUser(req, res, function () {
				res.redirect('/signup');
			});
		});
	});

};