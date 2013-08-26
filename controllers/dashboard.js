var User = require('../models/user');

// GET: /
exports.index = function (req, res) {

	if (!req.session.user) {
		return res.redirect('/signin');
	}

	res.render('users/dashboard', {
		title: 'Dashboard Yo'
	});

};