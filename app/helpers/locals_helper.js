'use strict';

exports.set = function (req, res, next) {

	if (req.session.auth) {
		res.locals.auth = req.session.auth;
	}

	res.locals.token = req.session._csrf;

	next();

};