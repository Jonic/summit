var mongoose = require('mongoose');

module.exports = function () {
	var mongooseConnectionString;

	if (process.env.NODE_ENV === 'development') {
		mongooseConnectionString = 'mongodb://localhost/diaryApp';
	} else {
		mongooseConnectionString = 'mongodb://heroku_app17742465:iem4vve7mp9a9nkjef9er5dehi@ds041198.mongolab.com:41198/heroku_app17742465';
	}

	console.log(mongooseConnectionString);

	mongoose.connect(mongooseConnectionString);

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function callback () {
		console.log('connected to db');
	});
};