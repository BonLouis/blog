const { query } = require('..');

module.exports = () =>
	query(`
------------------------------------------------------
-- Schema
CREATE SCHEMA IF NOT EXISTS blog;
------------------------------------------------------
-- Enum
CREATE TYPE blog.roles_enum AS ENUM ('admin', 'author', 'user');
  `);
