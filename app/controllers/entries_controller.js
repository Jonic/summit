'use strict';

// GET: /diary/:username/entry/:entryid
exports.show = function (req, res) {

	var user = req.user;

	if (!user) {
		return res.redirect('diary/not-found');
	}

	var entry = req.entry;

	if (!entry) {
		return res.redirect('diary/entry-not-found');
	}

	var diary = req.diary;

	diary.isOwner = user.username === req.session.auth.username;

	res.render('entries/show', {
		author: {
			firstName: user.firstName,
			username: user.username
		},
		diary: diary,
		entry: entry,
		page: {
			title: 'Diary Entry'
		}
	});

};

// GET: /diary/new-entry
exports.new = function (req, res) {

	res.render('entries/new', {
		page: {
			title: 'New Entry'
		}
	});

};

// POST: /diary/new-entry
exports.create = function (req, res) {

	var content = req.body.content;
	var entries = req.entries;
	var user = req.user;

	entries.push({
		content: content
	});

	user.save(function (err) {
		if (err) {
			throw err;
		}

		res.redirect('diary/' + req.session.auth.username);
	});

};

// GET: /diary/:username/entry/:entryId/edit
exports.edit = function (req, res) {

	var user = req.user;
	var entry = req.entry;

	res.render('entries/edit', {
		entry: entry,
		page: {
			title: 'Edit Entry'
		},
		user: user
	});

};

// PATCH/PUT: /diary/:username/entry/:entryId/edit
exports.update = function (req, res) {

	var user = req.user;
	var entry = req.entry;

	entry.content = req.body.content;

	user.save(function (err) {
		if (err) {
			throw err;
		}

		res.redirect('diary/' + req.session.auth.username + '/entry/' + entry._id);
	});

};

// GET: /diary/:username/entry/:entryId/delete
exports.delete = function (req, res) {

	var user = req.user;
	var entry = req.entry;

	res.render('entries/delete', {
		entry: entry,
		page: {
			title: 'Delete Entry'
		},
		user: user
	});

};

// DELETE: /diary/:username/entry/:entryId/delete
exports.destroy = function (req, res) {

	var user = req.user;
	var entry = req.entry;

	entry.remove(function (err) {
		if (err) {
			throw err;
		}

		user.save(function (err) {
			if (err) {
				throw err;
			}

			res.redirect('/diary/' + user.username);
		});
	});

};

// GET: /diary/entry-not-found
exports.notFound = function (req, res) {

	res.render('entries/notFound', {
		page: {
			title: 'Entry Not Found'
		}
	});

};

// GET: /diary/private-account
exports.privateAccount = function (req, res) {

	res.render('entries/privateAccount', {
		page: {
			title: 'Private Account'
		}
	});

};