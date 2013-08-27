var mongoose = require('mongoose');

module.exports = function () {
	var mongooseConnectionString;

	if (process.env.NODE_ENV === 'development') {
		mongooseConnectionString = 'mongodb://localhost/summit';
	} else {
		mongooseConnectionString = 'mongodb://nodejitsu_jonic:35hv7psnmj12a4iemkv38p85hr@ds027718.mongolab.com:27718/nodejitsu_jonic_nodejitsudb9980585474';
	}

	mongoose.connect(mongooseConnectionString);

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function callback () {
		console.log('connected to db via', mongooseConnectionString);
	});
};