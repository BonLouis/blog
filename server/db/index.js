require('dotenv').config({
	path: require('path').join(__dirname, '../../.env')
});
const { Pool } = require('pg');
const { addChar } = require('../utils');
const pool = new Pool({
	// number of milliseconds to wait before timing out when connecting a new client
	// by default this is 0 which means no timeout
	connectionTimeoutMillis: 0,

	// number of milliseconds a client must sit idle in the pool and not be checked out
	// before it is disconnected from the backend and discarded
	// default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
	idleTimeoutMillis: 1000,

	// maximum number of clients the pool should contain
	// by default this is set to 10.
	max: 10
});

/**
 * @param {String} query
 * @param {Array} params
 *
 * Print query string and args in a fancy manner
 * when process.env.DEBUG is truthy
 */
function prettyQuery (query, params, error) {
	console.log(`\n########## ${error ? 'ERROR' : 'DEBUG'} ##########`);
	console.log('#');
	console.log(addChar(query));
	if (params && params.length) {
		console.log('#');
		console.log('#', '~~~~~~~~~~~~~~~~~~~~~~~~~');
		console.log('#');
		for (const [index, param] of params.entries())
			console.log(addChar(`$${index + 1} :\t${param}`));
	}
	if (error) console.log(addChar(error));
	console.log('#');
	console.log(`######## END ${error ? 'ERROR' : 'DEBUG'} ########\n`);
}
function prettyError (query, params, error) {
	prettyQuery(query, params, error);
}
exports.query = (text, params) =>
	pool
		.query(text, params)
		.then((x) => {
			// yo
			if (process.env.DEBUG) {
				prettyQuery(text, params);
			}
			return x;
		})
		.catch(error => prettyError(text, params, error));
module.exports = (() => ({
	query: (text, params) =>
		pool
			.query(text, params)
			.then((x) => {
				// yo2
				if (process.env.DEBUG) {
					prettyQuery(text, params);
				}
				return x;
			})
			.catch(error => prettyError(text, params, error)),
	...require('./methods')
}))();
