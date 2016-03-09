'use strict';

const Hapi = require('hapi');
const assert = require('chai').assert;

describe('Hapi Static Headers', () => {
	it('should require object option', (done) => {
		const server = new Hapi.Server({debug: false});
		try {
			server.register(require('../'), () => {});
		} catch (e) {
			assert.equal(e.message, 'Option headers must be an object');
			done();
		}
	});

	it('should add headers to response', (done) => {
		const server = new Hapi.Server({debug: false});
		server.connection();

		server.register({
			register: require('../'),
			options: {
				headers: {
					foo: 'bar',
					boo: (req) => {
						return req.headers.test;
					}
				}
			}
		}, (err) => {
			if (err) {
				return done(err);
			}

			server.route({method: 'GET', path: '/', handler: (req, reply) => reply()});

			server
				.inject({
					url: '/',
					method: 'GET',
					headers: {test: 'foobar'}
				})
				.then((res) => {
					assert(res.headers.foo === 'bar');
					assert(res.headers.boo === 'foobar');
					done();
				});
		});

	});
});
