'use strict';

var path = process.cwd();
var UrlHandler = require(path + '/app/controllers/urlHandler.server.js');

module.exports = function (app, mongoose) {

	var urlHandler = new UrlHandler(mongoose);

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/new/*')
		.get(urlHandler.encodeUrl);

	app.route('/:urlId')
		.get(urlHandler.decodeUrl)
};
