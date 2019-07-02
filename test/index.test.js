'use strict';

const Hapi = require('@hapi/hapi');
const assert = require('chai').assert;
const Boom = require('@hapi/boom');
const plugin = require('../');

describe('Hapi Static Headers', () => {
	it('should require object option', async () => {
		const server = new Hapi.Server({debug: false});
		try {
			await server.register(require('../'));
		} catch (e) {
			assert.equal(e.message, 'Option headers must be an object');
		}
	});

	it('should add headers to response', async () => {
		const server = new Hapi.Server({debug: false});

		await server.register({
			plugin,
			options: {
				headers: {
					foo: 'bar',
					boo: (req) => {
						return req.headers.test;
					}
				}
			}
		});

		server.route({method: 'GET', path: '/', handler: () => ''});
		const res = await server.inject({
			url: '/',
			method: 'GET',
			headers: {test: 'foobar'}
		});

		assert(res.headers.foo === 'bar');
		assert(res.headers.boo === 'foobar');
	});

	it('should add headers to error responses', async () => {
		const server = new Hapi.Server({debug: false});

		await server.register({
			plugin,
			options: {
				headers: {
					foo: 'bar'
				}
			}
		});

		server.route({
			method: 'GET',
			path: '/',
			handler() {
				throw Boom.badData('foo');
			}
		});

		const res = await server.inject({
			url: '/',
			method: 'GET'
		});

		assert(res.headers.foo === 'bar');
	});
});
