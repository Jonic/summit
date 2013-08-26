var User = require('../models/user');
var hash = require('../lib/helpers/password').hash;

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

	var email = req.body.email;
	var password = req.body.password;

	if (!email) {
		console.log('Error: email missing');

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
		email: {
			$regex: new RegExp("^" + email.toLowerCase(), "i")
		}
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
			email: email
		});

		hash(password, function (err, salt, hash) {
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

				res.redirect('/dashboard');
			});
		});
	});

};

// GET: /signin
exports.signin = function (req, res) {

	if (req.session.user === true) {
		return res.redirect('/dashboard');
	}

	res.render('users/signin', {
		title: 'sign in to your account'
	});

};

// POST: /signin
exports.authenticateUser = function (req, res, next) {

	var email = req.body.email;
	var password = req.body.password;

	if (!email) {
		console.log('Error: email missing');

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
		email: {
			$regex: new RegExp("^" + email.toLowerCase(), "i")
		}
	}, function (error, user) {
		if (error) {
			console.log('Error getting users');

			return next(error);
		}

		if (!user) {
			console.log('User does not exist');

			return res.render('users/signin', {
				title: 'USER DOES NOT EXIST'
			});
		}

		console.log('user exists - checking password');

		hash(password, user.password.salt, function (err, hash) {
			if (err) {
				return fn(err);
			}

			if (hash === user.password.hash) {
				console.log('successfully authenticated user');

				req.session.user = true;

				return res.redirect('/dashboard');
			}

			console.log('password hash match failed');

			res.redirect('/signin');
		});
	});

};

// GET: /signout
exports.signout = function (req, res) {

	delete req.session.user;

	res.render('users/signout', {
		title: 'you have now signed out'
	});

};