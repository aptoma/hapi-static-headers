# @aptoma/hapi-static-headers

[Hapi](http://hapi.js) Plugin for adding a defined set of headers to be appended to all responses.

## Installation

This module is installed via npm:

	$ npm install @aptoma/hapi-static-headers


## Examples

```javascript

	const server = new Hapi.Server();
	server.connection();

	server.register({
		register: require('@aptoma/hapi-static-headers'),
		options: {
			headers: {
				'X-API-Version': '1.0.0',
				'X-Service': 'The Service'
			}
		}
	}, (err) => {});

```
