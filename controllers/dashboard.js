var User = require('../models/user');

// GET: /
exports.index = function (req, res) {

	res.render('users/dashboard', {
		title: 'Dashboard Yo'
	});

};