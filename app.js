/**
 * Module dependencies.
 */

var express = require('express');
var hbs = require('hbs');
var http = require('http');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(express);
var path = require('path');

var app = express();

require('./lib/db.js')();

// all environments
app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'hbs');

	app.use(express.favicon());
	app.use(express.static(path.join(__dirname, 'assets')));

	app.use(express.logger('dev'));

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('you should know me better than that'));
	app.use(express.session({
		secret: 'keyboard cat',
		cookie: {
			maxAge: 3600000
		},
		store: new MongoStore({
			db:mongoose.connection.db
		}, function (err) {
			console.log(err || 'connect-mongodb setup ok');
		})
	}));

	//require('./lib/authentication.js')(app);

	app.use(app.router);

	hbs.registerPartials(__dirname + '/views/_partials');
});

// development only
app.configure('development', function () {
	app.use(express.errorHandler());
});

require('./lib/routes.js')(app);

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});