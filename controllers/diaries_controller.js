var User = require('../models/user');

// GET: /diary/:username
exports.show = function (req, res) {

	var diaryUsername = req.params.username;

	if (!diaryUsername) {
		return res.redirect('/');
	}

	var diaryUser = User.findOne({
		username: diaryUsername
	}, function (err, diaryUser) {
		if (err) {
			return;
		}

		if (!diaryUser) {
			return res.render('diary/not-found');
		}

		res.render('diary/index', {
			auth: req.session.auth,
			diary: {
				entries: diaryUser.diary[0].entries,
				author: {
					firstName: diaryUser.firstName,
					username: diaryUser.username
				},
				diaryTitle: diaryUser.diary[0].name
			},
			title: 'Diary Index'
		});
	});

};
