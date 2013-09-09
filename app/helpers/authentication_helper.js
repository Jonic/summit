exports.ensureAuthenticated = function (req, res, next) {

	if (!req.session.auth) {
		req.session.redirectDestination = req.path;
		return res.redirect('/signin');
	}

	next();

};

exports.redirectToDashboardIfAuthenticated = function (req, res, next) {

	if (req.session.auth) {
		return res.redirect('/dashboard');
	}

	next();

};

exports.clearAuthenticatedUser = function (req, res, next) {

	delete req.session.auth;
	delete res.locals.auth;

	next();

};

exports.setAuthenticatedUser = function (values, req, res, next) {

	req.session.auth = values;

	next(req, res);

};