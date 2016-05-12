'use strict';
const Hoek = require('hoek');

exports.register = function (server, options, next) {
	Hoek.assert(typeof options.headers === 'object', 'Option headers must be an object');

	server.ext('onPreResponse', (request, reply) => {
		Object.keys(options.headers).forEach((key) => {
			const obj = options.headers[key];
			const value = typeof obj === 'function' ? obj(request) : obj;
			if (request.response.isBoom) {
				request.response.output.headers[key] = value;
			} else {
				request.response.header(key, value);
			}
		});
		reply.continue();
	});

	next();
};

exports.register.attributes = {
	name: 'hapi-static-headers'
};
