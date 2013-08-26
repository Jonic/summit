var controllers = require('../controllers');

module.exports = function (app) {

	app.get('/', controllers.home.index);

	app.get('/signup', controllers.users.signup);
	app.post('/signup', controllers.users.createUser);

	app.get('/signin', controllers.users.signin);
	app.post('/signin', controllers.users.authenticateUser);

	app.get('/signout', controllers.users.signout);

	app.get('/dashboard', controllers.dashboard.index);

	app.get('/diary/:user?', controllers.diary.index);

};