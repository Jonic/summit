var User = require('../models/user');

// GET: /
exports.home = function (req, res) {

	res.render('application/home', {
		page: {
			title: 'Home'
		}
	});

};

// GET: /dashboard
exports.dashboard = function (req, res) {

	res.render('application/dashboard', {
		page: {
			title: 'Dashboard'
		}
	});

};