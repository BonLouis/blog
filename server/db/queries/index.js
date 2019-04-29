module.exports = {
  createUser: `
    INSERT INTO blog.users (email, login, password, role) values ($1, $2, $3, $4) RETURNING *;
  `,
  findUser: `
    SELECT * FROM blog.users WHERE %I = %L;
  `
}
