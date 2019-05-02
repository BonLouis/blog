const format = require('pg-format');
const { ArgumentsError } = require('../../errors');
const { query } = require('../master');
const queries = require('./queries');

module.exports = {
	createCategory: (params) => {
		if (Array.isArray(params[0])) {
			return (async () => {
				for (const param of params)
					await query(queries.createCategory, param);
			})();
		}
		return query(queries.createCategory, params);
	},
	findCategory: ({ column = 'name', value } = {}) => {
		if (!value) throw new ArgumentsError('value');
		return module.exports
			.query(format(queries.findCategory, column, value))
			.then(({ rows }) => rows[0]);
	}
};
