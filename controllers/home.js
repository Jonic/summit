var User = require('../models/user');

// GET: /
exports.index = function (req, res) {

	res.render('home/index', {
		title: 'Welcome'
	});

};