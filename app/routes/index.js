'use strict';

var path = process.cwd();

module.exports = function (app, passport) {

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/new/:url')
		.post(function(req, res){
			res.send('ping');
		});
	app.route('/:urlId')
		.get(function(req, res){
			res.send('pong');
		})
};
