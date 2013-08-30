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

// GET: /diary/:user/entry/:entryid
exports.entry = function (req, res) {

	var username = req.query.username;

	if (!username) {
		res.redirect('/');
	} else {
		res.render('diary/entry', {
			auth: req.session.auth,
			saved: req.session.saved,
			title: 'Diary Entry'
		});

		req.session.saved = false;
	}

};

// GET: /diary/new-entry
exports.newEntryForm = function (req, res) {

	res.render('diary/newEntry', {
		auth: req.session.auth,
		title: 'New Entry'
	});

};

// POST: /diary/new-entry
exports.createNewEntry = function (req, res) {

	var content = req.body.content;
	var user = req.user;

	var diary = user.diary[0];

	user.diary[0].entries.push({
		content: content
	});

	user.save(function (err, user) {
		var args = Array.prototype.slice.call(arguments);

		console.log(args);

		if (err) {
			throw err;
		}

		req.session.saved = true;
		res.redirect('diary/' + user.username);
	});

};