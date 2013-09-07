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

		req.user = user;

		next();
	});

};

exports.setAuthenticatedUsernameForLookup = function (req, res, next) {

	req.username = req.session.auth.username;

	next();

};