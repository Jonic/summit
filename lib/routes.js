var controllers = require('../controllers/_index');
var helpers = require('../helpers/_index');

module.exports = function (app) {

	app.all('*', [
		helpers.locals.set
	]);

	//	Generic Routes
	app.get('/', [
		helpers.authentication.redirectToDashboardIfAuthenticated,
	], controllers.application.home);

	app.get('/dashboard', [
		helpers.authentication.ensureAuthenticated,
	], controllers.application.dashboard);

	//	Session Management
	app.get('/signup', [
		helpers.authentication.redirectToDashboardIfAuthenticated
	], controllers.users.new);

	app.post('/signup', [
		helpers.authentication.redirectToDashboardIfAuthenticated,
		helpers.users.get,
	], controllers.users.create);

	app.get('/signin', [
		helpers.authentication.redirectToDashboardIfAuthenticated
	],controllers.sessions.new);

	app.post('/signin', [
		helpers.authentication.redirectToDashboardIfAuthenticated,
		helpers.users.get,
	], controllers.sessions.create);

	app.get('/signout', controllers.sessions.destroy);

	//	Diaries and Entries
	app.get('/diary/new-entry', [
		helpers.authentication.ensureAuthenticated
	], controllers.entries.new);

	app.post('/diary/new-entry', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.setAuthenticatedUsernameForLookup,
		helpers.users.get,
	], controllers.entries.create);

	app.get('/diary/:username/entry/:entryId', [
		helpers.users.get,
		helpers.entries.getEntryById,
	], controllers.entries.show);

	app.get('/diary/not-found', controllers.diaries.notFound);
	app.get('/diary/entry-not-found', controllers.entries.notFound);

	app.get('/diary/:username', [
		helpers.users.get,
	], controllers.diaries.show);

};