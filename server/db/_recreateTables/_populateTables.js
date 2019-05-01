const argon2 = require('argon2');
const db = require('../');

module.exports = async () =>
	db.createUser([
		['admin@master.fr', 'master', await argon2.hash('admin'), 'admin'],
		['author@artist.fr', 'artist', await argon2.hash('pizza'), 'author'],
		['user@lambda.fr', 'lambda', await argon2.hash('pizza'), 'user']
	]);
