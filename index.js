'use strict';

function register(server, options) {
	if (typeof options.headers !== 'object') {
		throw new Error('Option headers must be an object');
	}

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
