'use strict';
const Hoek = require('hoek');

exports.register = function (server, options, next) {
	Hoek.assert(typeof options.headers === 'object', 'Option headers must be an object');

	server.ext('onPreResponse', (request, reply) => {
		Object.keys(options.headers).forEach((key) => {
			request.response.header(key, options.headers[key]);
		});
		reply.continue();
	});

	next();
};

exports.register.attributes = {
	name: 'hapi-static-headers'
};
