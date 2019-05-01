const { query } = require('../');

module.exports = () =>
	query(`

---- Tables
-- users
CREATE TABLE IF NOT EXISTS blog.users (
  user_id bigserial PRIMARY KEY,
  email text NOT NULL,
  login text NOT NULL,
  password text NOT NULL,
  role blog.roles_enum NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp,
  UNIQUE (email, login)
);
-- categories
CREATE TABLE IF NOT EXISTS blog.categories (
  category_id bigserial PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL,
  UNIQUE (name, slug)
);
-- posts
CREATE TABLE IF NOT EXISTS blog.posts (
  post_id bigserial PRIMARY KEY,
  content text NOT NULL,
  title text NOT NULL,
  author_id bigint REFERENCES blog.users NOT NULL,
  category_id bigint REFERENCES blog.categories,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp,
  UNIQUE (title)
);
`);
