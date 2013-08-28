var User = require('../models/user');

exports.getUser = function (req, res, next) {

	var identifier = req.body.identifier;
	var email = req.body.email;
	var username = req.body.username;

	if (identifier) {
		email = username = identifier;
	}

	User.findOne({
		$or: [
			{
				email: {
					$regex: new RegExp("^" + email, "i")
				}
			},
			{
				username: {
					$regex: new RegExp("^" + username, "i")
				}
			}
		]
	}, function (error, user) {
		if (error) {
			return next(error);
		}

		req.user = user;

		next();
	});

};