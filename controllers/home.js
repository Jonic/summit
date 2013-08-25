var User = require('../models/user');

// GET: /
exports.index = function (req, res) {

	res.render('default', {
		title: 'Whatever'
	});

};