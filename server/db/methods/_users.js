const format = require('pg-format');
const argon2 = require('argon2');
const { ArgumentsError } = require('../../errors');
const queries = require('../queries');
const db = require('../');
console.log('yo', db.query.toString());
module.exports = {
	createUser: (params) => {
		if (Array.isArray(params[0])) {
			return (async () => {
				for (const param of params) {
					console.log(module.exports);
					await db.query(queries.createUser, param);
				}
			})();
		}
		return db.query(queries.createUser, params);
	},
	findUser: ({ column = 'login', value } = {}) => {
		if (!value) throw new ArgumentsError('value');
		return module.exports
			.query(format(queries.findUser, column, value))
			.then(({ rows }) => rows[0]);
	},
	checkPassword: ({ user, attemptPassword, column = 'login' } = {}) => {
		if (!user) throw new ArgumentsError('Undefined user');
		if (!attemptPassword)
			throw new ArgumentsError('Undefined password to check');
		module.exports.findUser();
		argon2.verify();
	}
};
