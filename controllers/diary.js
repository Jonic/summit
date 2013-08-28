var User = require('../models/user');

// GET: /diary/:user
exports.index = function (req, res) {

	var username = req.query.username;

	if (!username) {
		res.redirect('/');
	} else {
		res.render('diary/index', {
			title: 'Diary Index'
		});
	}

};

// GET: /diary/:user/
exports.entry = function (req, res) {

	var username = req.query.username;

	if (!username) {
		res.redirect('/');
	} else {
		res.render('diary/entry', {
			title: 'Diary Entry'
		});
	}

};