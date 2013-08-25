var User = require('../models/user');

// GET: /
exports.index = function (req, res) {

	var user = req.param.user;

	if (!user) {
		res.redirect('/');
	} else {
		res.render('diary/index', {
			title: 'Diary Index'
		});
	}

};