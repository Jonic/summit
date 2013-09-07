var User = require('../models/user');

// GET: /diary/:username/entry/:entryid
exports.show = function (req, res) {

	var diaryUser = req.user;

	if (!diaryUser) {
		return res.redirect('diary/not-found');
	}

	var diaryEntry = req.diaryEntry;

	if (!diaryEntry) {
		return res.redirect('diary/entry-not-found');
	}

	res.render('entries/show', {
		diary: {
			author: {
				firstName: diaryUser.firstName,
				username: diaryUser.username
			},
			diaryTitle: diaryUser.diary[0].name
		},
		entry: diaryEntry,
		title: 'Diary Entry'
	});

};

// GET: /diary/new-entry
exports.new = function (req, res) {

	res.render('entries/new', {
		title: 'New Entry'
	});

};

// POST: /diary/new-entry
exports.create = function (req, res) {

	var content = req.body.content;
	var user = req.user;

	var diary = user.diary[0];

	user.diary[0].entries.push({
		content: content
	});

	user.save(function (err, user) {
		var args = Array.prototype.slice.call(arguments);

		if (err) {
			throw err;
		}

		req.session.saved = true;
		res.redirect('diary/' + req.session.auth.username);
	});

};

// GET: /diary/entry-not-found
exports.notFound = function (req, res) {

	res.render('entries/notFound', {
		title: 'Entry Not Found'
	});

};