const format = require('pg-format');
const { ArgumentsError } = require('../../errors');
const { query } = require('../master');
const queries = require('./queries');

module.exports = {
	createPost: (params) => {
		if (Array.isArray(params[0])) {
			return (async () => {
				for (const param of params)
					await query(queries.createPost, param);
			})();
		}
		return query(queries.createPost, params);
	},
	findPost: ({ column = 'title', value } = {}) => {
		if (!value) throw new ArgumentsError('value');
		return module.exports
			.query(format(queries.findPost, column, value))
			.then(({ rows }) => rows[0]);
	}
};
