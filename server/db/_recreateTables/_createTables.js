const { query } = require('../')

module.exports = () =>
  query(`
  ------------------------------------------------------
  -- Schema
  CREATE SCHEMA IF NOT EXISTS blog;
  ------------------------------------------------------
  -- Enum
  CREATE TYPE blog.roles_enum AS ENUM ('admin', 'author', 'user');
  ------------------------------------------------------
  ---- Tables
  -- users
  CREATE TABLE IF NOT EXISTS blog.users (
    user_id bigserial PRIMARY KEY,
    email text NOT NULL,
    login text NOT NULL,
    password text NOT NULL,
    role blog.roles_enum NOT NULL,
    created_at timestamp DEFAULT current_timestamp,
    UNIQUE (email, login)
  );
`)
