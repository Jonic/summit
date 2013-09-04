var User = require('../models/user');

// GET: /diary/:username/entry/:entryid
exports.show = function (req, res) {

	var diaryUsername = req.params.username;
	var entryId = req.params.entryId;

	if (!diaryUsername || !entryId) {
		res.redirect('/');
	} else {
		var diaryUser = User.findOne({
			username: diaryUsername
		}, function (err, diaryUser) {
			if (err) {
				return;
			}

			if (!diaryUser) {
				return res.redirect('diary/not-found');
			}

			var entry = diaryUser.diary[0].entries.filter(function (entry) {
				return entry._id.toString() === entryId;
			})[0];

			res.render('entries/show', {
				auth: req.session.auth,
				diary: {
					author: {
						firstName: diaryUser.firstName,
						username: diaryUser.username
					},
					diaryTitle: diaryUser.diary[0].name
				},
				entry: entry,
				title: 'Diary Entry'
			});
		});
	}

};

// GET: /diary/new-entry
exports.new = function (req, res) {

	res.render('entries/new', {
		auth: req.session.auth,
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
		res.redirect('diary/' + user.username);
	});

};