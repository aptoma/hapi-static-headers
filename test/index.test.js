'use strict';

const Hapi = require('hapi');
const assert = require('chai').assert;
const Boom = require('boom');

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
		})
			.then(() => {
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
			})
			.catch(done);
	});

	it('should add headers to error responses', (done) => {
		const server = new Hapi.Server({debug: false});
		server.connection();

		server.register({
			register: require('../'),
			options: {
				headers: {
					foo: 'bar'
				}
			}
		})
			.then(() => {
				server.route({method: 'GET', path: '/', handler: (req, reply) => reply(Boom.badData('foo'))});
				server
					.inject({
						url: '/',
						method: 'GET'
					})
					.then((res) => {
						assert(res.headers.foo === 'bar');
						done();
					});
			})
			.catch(done);
	});
});
