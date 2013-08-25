var User = require('../models/user');
var password = require('../lib/helpers/password')

// GET: /signup
exports.signup = function (req, res) {

	//	If logged in redirect to dashboard?
	res.render('users/signup', {
		title: 'sign up for DiaryApp'
	});

};

// POST: /signup
exports.createUser = function (req, res) {

	res.redirect('/dashboard');

};

// GET: /signin
exports.signin = function (req, res) {

	//	If logged in redirect to dashboard?
	res.render('users/signin', {
		title: 'sign in to your account'
	});

};

// GET: /signup
exports.signout = function (req, res) {

	//	If logged in redirect to dashboard?
	res.render('users/signout', {
		title: 'you have now signed out'
	});

};
