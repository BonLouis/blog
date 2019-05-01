const { query } = require('../');

module.exports = () =>
	query(`
DROP SCHEMA IF EXISTS blog CASCADE;
DROP TYPE IF EXISTS blog.roles_enum;
`);
