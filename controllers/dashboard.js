var User = require('../models/user');

// GET: /dashboard
exports.index = function (req, res) {

	res.render('dashboard/index', {
		title: 'Dashboard',
		auth: req.session.auth
	});

};