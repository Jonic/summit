var User = require('../models/user');

// GET: /diary/:username
exports.show = function (req, res) {

	var user = req.user;
	var diary = req.diary;
	var entries = req.entries;

	if (!user) {
		return res.redirect('diary/not-found');
	}

	diary.isOwner = user.username === req.session.auth.username;

	res.render('diaries/show', {
		author: {
			firstName: user.firstName,
			username: user.username
		},
		diary: diary,
		entries: entries,
		page: {
			title: diary.title
		}
	});

};

// GET: /diary/not-found
exports.notFound = function (req, res) {

	res.render('diaries/notFound', {
		page: {
			title: 'Diary Not Found'
		}
	});

};