var controllers = require('../controllers/_index');
var helpers = require('../helpers');

module.exports = function (app) {

	//	Generic Routes
	app.get('/', controllers.application.index);

	app.get('/dashboard', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.getUser
	], controllers.application.dashboard);

	//	Session Management
	app.get('/signup', [
		helpers.authentication.redirectToDashboardIfAuthenticated
	], controllers.users.new);

	app.post('/signup', [
		helpers.authentication.redirectToDashboardIfAuthenticated,
		helpers.users.getUser
	], controllers.users.create);

	app.get('/signin', [
		helpers.authentication.redirectToDashboardIfAuthenticated
	],controllers.sessions.new);

	app.post('/signin', [
		helpers.authentication.redirectToDashboardIfAuthenticated,
		helpers.users.getUser
	], controllers.sessions.create);

	app.get('/signout', controllers.sessions.destroy);

	//	Diaries and Entries
	app.get('/diary/:username', [
		helpers.users.getUser
	], controllers.diaries.show);

	app.get('/diary/new-entry', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.getUser
	], controllers.entries.new);

	app.post('/diary/new-entry', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.getUser
	], controllers.entries.create);

	app.get('/diary/:username/entry/:entryid', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.getUser
	], controllers.entries.show);

};