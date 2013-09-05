var User = require('../models/user');

// GET: /diary/:username
exports.show = function (req, res) {

	var diaryUser = req.user;

	if (!diaryUser) {
		return res.redirect('diary/not-found');
	}

	res.render('diaries/show', {
		diary: {
			entries: diaryUser.diary[0].entries,
			author: {
				firstName: diaryUser.firstName,
				username: diaryUser.username
			},
			diaryTitle: diaryUser.diary[0].name
		},
		saved: req.session.saved,
		title: 'Diary Index'
	});

	req.session.saved = false;

};

// GET: /diary/not-found
exports.notFound = function (req, res) {

	res.render('diaries/notFound', {
		title: 'Diary Not Found'
	});

};