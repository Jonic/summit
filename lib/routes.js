var controllers = require('../controllers');
var helpers = require('../helpers');

module.exports = function (app) {

	app.get('/', controllers.home.index);

	app.get('/signup', [
		helpers.authentication.redirectToDashboardIfAuthenticated
	], controllers.users.signup);

	app.post('/signup', [
		helpers.authentication.redirectToDashboardIfAuthenticated,
		helpers.users.getUser
	], controllers.users.createUser);

	app.get('/signin', [
		helpers.authentication.redirectToDashboardIfAuthenticated
	],controllers.users.signin);

	app.post('/signin', [
		helpers.authentication.redirectToDashboardIfAuthenticated,
		helpers.users.getUser
	], controllers.users.authenticateUser);

	app.get('/signout', controllers.users.signout);

	app.get('/dashboard', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.getUser
	], controllers.dashboard.index);

	app.get('/diary/new-entry', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.getUser
	], controllers.diary.newEntryForm);

	app.post('/diary/new-entry', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.getUser
	], controllers.diary.createNewEntry);

	app.get('/diary/:username', [
		helpers.users.getUser
	], controllers.diary.index);

	app.get('/diary/:username/entry/:entryid', [
		helpers.authentication.ensureAuthenticated,
		helpers.users.getUser
	], controllers.diary.entry);

};