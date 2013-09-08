var express = require('express');

var app = express();
var hbs = require('hbs');
var http = require('http');
var mongoose = require('mongoose');
var mongostore = require('connect-mongo')(express);
var path = require('path');

require('./config/db.js')();

var mongostoreSettings = {
	cookie: {
		maxAge: (60 * 60 * 24 * 28)
	},
	secret: 'i should live in salt for leaving you behind',
	store: new mongostore({
		db:mongoose.connection.db
	}, function (err) {
		console.log(err || 'connect-mongodb setup ok');
	})
};

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'hbs');

app.use(express.bodyParser());
app.use(express.cookieParser('you should know me better than that'));
app.use(express.errorHandler());
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.session(mongostoreSettings));
app.use(express.static(path.join(__dirname, '/public')));

app.use(app.router);

require('./config/routes.js')(app);

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});