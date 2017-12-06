'use strict';
const Hoek = require('hoek');

function register(server, options) {
	Hoek.assert(typeof options.headers === 'object', 'Option headers must be an object');

	server.ext('onPreResponse', (request) => {
		Object.keys(options.headers).forEach((key) => {
			const obj = options.headers[key];
			const value = typeof obj === 'function' ? obj(request) : obj;
			if (request.response.isBoom) {
				request.response.output.headers[key] = value;
			} else {
				request.response.header(key, value);
			}
		});

		return request.response;
	});
}

module.exports = {
	name: 'hapi-static-headers',
	register
};
