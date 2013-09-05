var User = require('../models/user');

// GET: /diary/:username
exports.show = function (req, res) {

	var diaryUsername = req.params.username;

	if (!diaryUsername) {
		return res.redirect('diary/not-found');
	}

	var diaryUser = User.findOne({
		username: diaryUsername
	}, function (err, diaryUser) {
		if (err) {
			return;
		}

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
	});

};

// GET: /diary/not-found
exports.notFound = function (req, res) {

	res.render('diaries/notFound', {
		title: 'Diary Not Found'
	});

};