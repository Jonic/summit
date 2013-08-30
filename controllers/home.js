var User = require('../models/user');

// GET: /
exports.index = function (req, res) {

	if (req.session.auth) {
		return res.redirect('/dashboard');
	}

	res.render('home/index', {
		auth: req.session.auth,
		title: 'Welcome'
	});

};