var User = require('../models/user');

// GET: /dashboard
exports.index = function (req, res) {

	res.render('users/dashboard', {
		title: 'Dashboard Yo',
		username: req.session.auth.firstName
	});

};