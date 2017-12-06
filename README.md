[![Build Status](https://travis-ci.org/aptoma/hapi-static-headers.svg?branch=master)](https://travis-ci.org/aptoma/hapi-static-headers)

# @aptoma/hapi-static-headers

[Hapi](http://hapi.js) Plugin for adding a defined set of headers to be appended to all responses.

## Installation

This module is installed via npm:

	$ npm install @aptoma/hapi-static-headers


## Examples

```javascript

	const server = new Hapi.Server();

	await server.register({
		plugin: require('@aptoma/hapi-static-headers'),
		options: {
			headers: {
				'X-API-Version': (request) => {
					return request.pre.apiVersion;
				},
				'X-Service': 'The Service'
			}
		}
	});

```
