var User = require('../models/user');

// GET: /diary/:user
exports.index = function (req, res) {

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
			return res.render('diary/notfound');
		}

		console.log('diaryUser', diaryUser);

		res.render('diary/index', {
			auth: req.session.auth,
			diary: {
				//entries: diaryUser.diary[0].entries,
				authorName: diaryUser.name,
				//diaryTitle: diaryUser.diary[0].name
			},
			title: 'Diary Index'
		});
	});

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