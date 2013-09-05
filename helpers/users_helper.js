var User = require('../models/user');

exports.getUser = function (req, res, next) {

	var identifier = req.params.username || req.session.auth.username;

	User.findOne({
		$or: [
			{ email:    { $regex: new RegExp("^" + identifier, "i") } },
			{ username: { $regex: new RegExp("^" + identifier, "i") } }
		]
	}, function (err, user) {
		if (err) {
			return next(err);
		}

		req.user = user;

		next();
	});

};