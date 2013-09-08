exports.set = function (req, res, next) {

	if (req.session.auth) {
		res.locals.auth = req.session.auth;
	}

	if (req.session.saved) {
		res.locals.saved = true;
		req.session.saved = false;
	}

	res.locals.token = req.session._csrf;

	next();

};