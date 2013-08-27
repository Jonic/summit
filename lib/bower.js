var bower = require('bower');
var path = require('path');

bower.commands.install([path.resolve("./assets/vendor")]).on('end', function (installed) {
	console.log(installed);
});