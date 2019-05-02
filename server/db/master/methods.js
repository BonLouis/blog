const { Pool } = require('pg');
const { prettyQuery, prettyError } = require('../../utils/db');

const pool = new Pool(require('./config'));

module.exports = {
	query: (text, params) =>
		pool
			.query(text, params)
			.then((x) => {
				if (process.env.DEBUG) {
					prettyQuery(text, params);
				}
				return x;
			})
			.catch(error => prettyError(text, params, error))
};
