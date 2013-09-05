var User = require('../models/user');

exports.getUser = function (req, res, next) {

	var identifier = req.param('identifier');
	var email = req.param('email');
	var username = req.param('username');

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
	}, '-email -password', function (error, user) {
		if (error) {
			return next(error);
		}

		req.user = user;

		next();
	});

};