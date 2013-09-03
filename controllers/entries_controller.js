var User = require('../models/user');

// GET: /diary/:user/entry/:entryid
exports.show = function (req, res) {

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
exports.new = function (req, res) {

	res.render('diary/newEntry', {
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

		console.log(args);

		if (err) {
			throw err;
		}

		req.session.saved = true;
		res.redirect('diary/' + user.username);
	});

};