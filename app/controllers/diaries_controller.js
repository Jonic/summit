var User = require('../models/user');

// GET: /diary/:username
exports.show = function (req, res) {

	var user = req.user;
	var diary = req.diary;
	var entries = req.entries;

	if (!user) {
		req.flash('alert', {
			className: 'warning',
			title: 'Diary Not Found!',
			description: 'there were errors there',
			messages: [
				'First message',
				'message two',
				'Another message'
			]
		});

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

	var alert = req.flash('alert')[0];

	res.render('diaries/notFound', {
		alert: alert,
		page: {
			title: 'Diary Not Found'
		}
	});

};