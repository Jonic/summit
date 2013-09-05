var User = require('../models/user');

exports.get = function (req, res, next) {

	var username = res.locals.username || req.param('username');

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

	res.locals.username = req.session.auth.username;

	next();

};