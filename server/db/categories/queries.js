module.exports = {
	createCategory: `
    INSERT INTO blog.categories (name, slug) values ($1, $2) RETURNING *;
  `,
	findCategory: `
    SELECT * FROM blog.users WHERE %I = %L;
  `
};
