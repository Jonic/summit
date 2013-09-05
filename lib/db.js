module.exports = function () {

	var connectionStrings = {
		development: 'mongodb://localhost/summit',
		production: 'mongodb://nodejitsu_jonic:35hv7psnmj12a4iemkv38p85hr@ds027718.mongolab.com:27718/nodejitsu_jonic_nodejitsudb9980585474'
	};

	var mongoose = require('mongoose');

	var connectionString = connectionStrings[process.env.NODE_ENV];

	mongoose.connect(connectionString);

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function () {
		console.log('Connected to database at', connectionString);
	});

};