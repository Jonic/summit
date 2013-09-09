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

	if (req.user) {
		return res.render('users/new', {
			page: {
				title: 'Email or username in use!'
			}
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

// POST /your-profile/edit
exports.update = function (req, res) {

	var user = req.user;
	var diary = req.diary;

	user.name = req.body.name;
	diary.title = req.body.diaryTitle;

	user.save(function (err, user) {
		if (err) {
			throw err;
		}

		res.redirect('/your-profile/edit');
	});

};

// POST /your-profile/change-email
exports.updateEmail = function (req, res) {

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
			return res.render('users/edit', {
				page: {
					title: 'Email Address In Use!'
				},
				user: user
			});
		} else {
			user.email = req.body.email;

			user.save(function (err, user) {
				if (err) {
					throw err;
				}

				return res.redirect('/your-profile/edit');
			});
		}
	});

};

// GET /your-profile/verify-email/:key
exports.verifyEmail = function (req, res) {

	res.redirect('/your-profile');

};

// POST /your-profile/change-password
exports.updatePassword = function (req, res) {

	var user = req.user;

	var password = req.body.password;
	var passwordNew = req.body.passwordNew;
	var passwordRepeat = req.body.passwordRepeat;

	helpers.password.hash(password, user.password.salt, function (err, hash) {
		if (err) {
			return fn(err);
		}

		if (hash === user.password.hash) {
			if (passwordNew === passwordRepeat) {
				helpers.password.hash(passwordNew, function (err, salt, hash) {
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

						res.redirect('/your-profile/edit');
					});
				});
			} else {
				console.log('passwords did not match');
				res.redirect('/your-profile/edit');
			}
		} else {
			console.log('could not verify password');
			res.redirect('/your-profile/edit');
		}
	});

};

// GET /your-profile/delete
exports.delete = function (req, res) {

	return res.render('users/delete');

};

// POST /your-profile/delete
exports.destroy = function (req, res) {

	var user = req.user;

	var password = req.body.password;

	helpers.password.hash(password, user.password.salt, function (err, hash) {
		if (err) {
			return fn(err);
		}

		if (hash === user.password.hash) {
			user.remove(function (err, user) {
				if (err) {
					throw err;
				}

				helpers.authentication.clearAuthenticatedUser(req, res, function () {
					res.redirect('/signup');
				});
			});
		} else {
			console.log('could not verify password');
			res.redirect('/your-profile/edit');
		}
	});

};