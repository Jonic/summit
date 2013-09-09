var controllers = require('../app/controllers/_index');
var helpers = require('../app/helpers/_index');

module.exports = function (app) {

	//	Catch-all Routes
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

	app.get('/not-authorised', controllers.application.notAuthorised);



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



	//	User Accounts
	app.get('/your-profile', [
		helpers.authentication.ensureAuthenticated,
	], controllers.users.show);

	app.get('/your-profile/edit', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.setAuthenticatedUsernameForLookup,
		helpers.users.get,
	], controllers.users.edit);

	app.put('/your-profile/edit', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.setAuthenticatedUsernameForLookup,
		helpers.users.get,
	], controllers.users.update);

	app.put('/your-profile/change-email', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.setAuthenticatedUsernameForLookup,
		helpers.users.get,
	], controllers.users.updateEmail);

	app.get('/your-profile/verify-email/:key', [
		helpers.users.get,
	], controllers.users.verifyEmail);

	app.put('/your-profile/change-password', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.setAuthenticatedUsernameForLookup,
		helpers.users.get,
	], controllers.users.updatePassword);

	app.get('/your-profile/delete', [
		helpers.authentication.ensureAuthenticated
	], controllers.users.delete);

	app.delete('/your-profile/delete', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.setAuthenticatedUsernameForLookup,
		helpers.users.get
	], controllers.users.destroy);



	//	Entries
	app.get('/diary/new-entry', [
		helpers.authentication.ensureAuthenticated
	], controllers.entries.new);

	app.post('/diary/new-entry', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.setAuthenticatedUsernameForLookup,
		helpers.users.get
	], controllers.entries.create);

	app.get('/diary/:username/entry/:entryId', [
		helpers.users.get,
		helpers.entries.getEntryById,
	], controllers.entries.show);

	app.get('/diary/:username/entry/:entryId/edit', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.get,
		helpers.users.ensureAuthorised,
		helpers.entries.getEntryById,
	], controllers.entries.edit);

	app.put('/diary/:username/entry/:entryId/edit', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.get,
		helpers.users.ensureAuthorised,
		helpers.entries.getEntryById,
	], controllers.entries.update);

	app.get('/diary/:username/entry/:entryId/delete', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.get,
		helpers.users.ensureAuthorised,
		helpers.entries.getEntryById,
	], controllers.entries.delete);

	app.delete('/diary/:username/entry/:entryId/delete', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.get,
		helpers.users.ensureAuthorised,
		helpers.entries.getEntryById,
	], controllers.entries.destroy);

	app.get('/diary/entry-not-found', controllers.entries.notFound);



	//	Diaries
	app.get('/diary/not-found', controllers.diaries.notFound);

	app.get('/diary/:username', [
		helpers.users.get,
	], controllers.diaries.show);

};