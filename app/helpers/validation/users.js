'use strict';

var User = require('../../models/user');

exports.create = function (req, res) {

	var errors = req.validationErrors();

	req.assert(typeof req.user, 'This user already exists!').equals('object');

	if (!errors) {
		User.findOne({
			email: {
				$regex: new RegExp("^" + req.body.email, "i")
			}
		}, function (err, user) {
			req.assert(typeof req.user, 'This email address is already in use!').equals('object');

			if (!errors) {
				var form = {
					name: {
						error: req.assert('username', 'Please enter your username').notEmpty(),
						value: req.body.name
					},
					username: {
						error: req.assert('name', 'Please enter your name').notEmpty(),
						value: req.body.username
					},
					email: {
						error: req.assert('email', 'Please enter a valid email address').isEmail(),
						value: req.body.email
					},
					password: {
						error: req.assert('password', 'Your password must be at least five characters long, yeah').len(5),
						value: req.body.password
					},
					privateAccount: {
						checked: req.body.privateAccount ? 'checked="checked"' : ''
					}
				};

				if (errors) {
					return res.render('users/new', {
						alert: {
							className: 'warning',
							title: 'Can not do that!',
							description: 'there were errors there',
							errors: errors,
							form: form
						},
						page: {
							title: 'You are an idiot'
						}
					});
				}
			}
		});
	}

};

exports.update = function (req, res, next) {

	req.assert(typeof req.user, 'This user already exists!').equals('object');

	if (!req.validationErrors()) {
		req.assert('username', 'Please enter your username').notEmpty();
		req.assert('diaryTitle', 'Please enter a diary title').notEmpty();
	}

	next();

};

exports.updateEmail = function (req, res, next) {

	req.assert(typeof req.user, 'This email address is in use!').equals('object');

	if (!req.validationErrors()) {
		req.assert('email', 'Please enter a valid email address').isEmail();
	}

	next();

};

exports.updatePassword = function (req, res, next) {

	req.assert('password', 'Please enter your current password').notEmpty();
	req.assert('passwordNew', 'Your new password must be at least five characters long, yeah').len(5);
	req.assert('passwordRepeat', 'Password confirmation did not match password').equals('password');

	next();

};

exports.destroy = function (req, res, next) {

	req.assert('password', 'Please enter your current password').notEmpty();

	next();

};