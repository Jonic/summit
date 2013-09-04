var controllers = require('../controllers/_index');
var helpers = require('../helpers/_index');

module.exports = function (app) {

	app.all('*', helpers.users.getUser);

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
	], controllers.users.create);

	app.get('/signin', [
		helpers.authentication.redirectToDashboardIfAuthenticated
	],controllers.sessions.new);

	app.post('/signin', [
		helpers.authentication.redirectToDashboardIfAuthenticated,
	], controllers.sessions.create);

	app.get('/signout', controllers.sessions.destroy);

	//	Diaries and Entries
	app.get('/diary/new-entry', [
		helpers.authentication.ensureAuthenticated,
	], controllers.entries.new);

	app.post('/diary/new-entry', [
		helpers.authentication.ensureAuthenticated,
	], controllers.entries.create);

	app.get('/diary/:username/entry/:entryId', [
		helpers.authentication.ensureAuthenticated,
	], controllers.entries.show);

	app.get('/diary/not-found', controllers.application.diaryNotFound);

	app.get('/diary/:username', controllers.diaries.show);

};