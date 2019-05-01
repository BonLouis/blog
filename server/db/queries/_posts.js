module.exports = {
	createPost: `
    INSERT INTO blog.posts (title, content, author_id, category_id) values ($1, $2, $3, $4) RETURNING *;
  `,
	findPost: `
    SELECT * FROM blog.posts WHERE %I = %L;
  `
};
