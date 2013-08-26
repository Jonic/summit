var User = require('../models/user');

// GET: /diary/:user
exports.getDiaryForUser = function (req, res) {

	var username = req.query.username;

	if (!username) {
		res.redirect('/');
	} else {
		res.render('diary/index', {
			title: 'Diary Index'
		});
	}

};