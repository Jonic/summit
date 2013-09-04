var User = require('../models/user');

// GET: /
exports.home = function (req, res) {

	res.render('application/home', {
		title: 'Welcome'
	});

};

// GET: /dashboard
exports.dashboard = function (req, res) {

	res.render('application/dashboard', {
		title: 'Dashboard'
	});

};

// GET: /diary/not-found
exports.diaryNotFound = function (req, res) {

	res.render('application/diaryNotFound', {
		title: 'Dashboard'
	});

};