var User = require('../models/user');

var authenticationHelper = require('../lib/helpers/authentication');
var passwordHelper = require('../lib/helpers/password');

// GET: /signup
exports.signup = function (req, res) {

	if (req.session.user === true) {
		return res.redirect('/dashboard');
	}

	res.render('users/signup', {
		title: 'sign up for DiaryApp'
	});

};

// POST: /signup
exports.createUser = function (req, res, next) {

	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;

	if (!name) {
		console.log('Error: name missing');

		return res.render('users/signup', {
			title: 'sign up for DiaryApp'
		});
	}

	if (!email) {
		console.log('Error: email missing');

		return res.render('users/signup', {
			title: 'sign up for DiaryApp'
		});
	} else {
		email = email.toLowerCase();
	}

	if (!username) {
		console.log('Error: username missing');

		return res.render('users/signup', {
			title: 'sign up for DiaryApp'
		});
	}

	if (!password) {
		console.log('Error: password missing');

		return res.render('users/signup', {
			title: 'sign up for DiaryApp'
		});
	}

	User.findOne({
		$or: [
			{
				email: {
					$regex: new RegExp("^" + email, "i")
				}
			},
			{
				username: {
					$regex: new RegExp("^" + username, "i")
				}
			}
		]
	}, function (error, user) {
		if (error) {
			console.log('Error getting users');

			return next(error);
		}

		if (user) {
			console.log('User already exists');

			return res.render('users/signup', {
				title: 'sign up for DiaryApp'
			});
		}

		console.log('User does not exist yet - add them to the database');

		var user = new User({
			diary: {
				name: 'My Diary'
			},
			email: email,
			name: name,
			username: username
		});

		passwordHelper.hash(password, function (err, salt, hash) {
			if (err) {
				throw err;
			}

			console.log('password hashed', password, salt, hash);

			user.password.salt = salt;
			user.password.hash = hash;

			user.save(function (error, user) {
				if (error) {
					console.log('error saving', error);

					return next(error);
				}

				console.log('user saved!', user);

				req.session.user = true;
				req.session.firstName = user.firstName;

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

	var identifier = req.body.identifier;
	var password = req.body.password;

	if (!identifier) {
		console.log('Error: identifier missing');

		return res.render('users/signin', {
			title: 'Failed to authenticate user'
		});
	}

	if (!password) {
		console.log('Error: password missing');

		return res.render('users/signin', {
			title: 'Failed to authenticate user'
		});
	}

	User.findOne({
		$or: [
			{
				email: {
					$regex: new RegExp("^" + identifier, "i")
				}
			},
			{
				username: {
					$regex: new RegExp("^" + identifier, "i")
				}
			}
		]
	}, function (error, user) {
		if (error) {
			return res.render('users/signin', {
				title: 'Error getting users'
			});
		}

		if (!user) {
			console.log('User does not exist');

			return res.render('users/signin', {
				title: 'USER DOES NOT EXIST'
			});
		}

		console.log('user exists - checking password');

		passwordHelper.hash(password, user.password.salt, function (err, hash) {
			if (err) {
				return fn(err);
			}

			if (hash === user.password.hash) {
				console.log('successfully authenticated user');

				return authenticationHelper.setAuthenticatedUser({
					loggedin: true,
					firstName: user.firstName,
					username: user.username
				}, req, res, function (req, res) {
					res.redirect('/dashboard');
				});
			}

			console.log('password hash match failed');

			res.redirect('/signin');
		});
	});

};

// GET: /signout
exports.signout = function (req, res) {

	authenticationHelper.clearAuthenticatedUser(req, res, function () {
		res.render('users/signout', {
			title: 'you have now signed out'
		});
	});

};