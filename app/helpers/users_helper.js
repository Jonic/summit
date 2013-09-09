var User = require('../models/user');

exports.get = function (req, res, next) {

	var username = req.username || req.param('username');

	User.findOne({
		username: {
			$regex: new RegExp("^" + username, "i")
		}
	}, function (err, user) {
		if (err) {
			return next(err);
		}

		if (user) {
			req.username = user.username;
			req.user = user;
			req.diary = user.diary[0];
			req.entries = user.diary[0].entries;
		}

		next();
	});

};

exports.setAuthenticatedUsernameForLookup = function (req, res, next) {

	req.username = req.session.auth.username;

	next();

};

exports.ensureAuthorised = function (req, res, next) {

	if (req.username !== req.session.auth.username) {
		return res.redirect('/not-authorised');
	}

	next();

};