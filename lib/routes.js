var authenticationHelper = require('./helpers/authentication');
var controllers = require('../controllers');

module.exports = function (app) {

	app.get('/', controllers.home.index);

	app.get('/signup', [
		authenticationHelper.redirectToDashboardIfAuthenticated
	], controllers.users.signup);

	app.post('/signup', [
		authenticationHelper.redirectToDashboardIfAuthenticated
	], controllers.users.createUser);

	app.get('/signin', [
		authenticationHelper.redirectToDashboardIfAuthenticated
	],controllers.users.signin);

	app.post('/signin', [
		authenticationHelper.redirectToDashboardIfAuthenticated
	], controllers.users.authenticateUser);

	app.get('/signout', controllers.users.signout);

	app.get('/dashboard', [
		authenticationHelper.ensureAuthenticated
	], controllers.dashboard.index);

	app.get('/diary/:username', [
		authenticationHelper.ensureAuthenticated
	], controllers.diary.getDiaryForUser);

};