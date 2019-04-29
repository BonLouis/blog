const argon2 = require('argon2')
const { createUser } = require('../')

// module.exports = (async () => {
//   const users = [
//     ['a@a.fr', 'admin', await argon2.hash('pizza'), 'admin'],
//     ['l@l.fr', 'lambda', await argon2.hash('pizza'), 'user']
//   ]
//   for (const user of users) createUser(user)
// })()

module.exports = async () =>
  createUser([
    ['admin@master.fr', 'master', await argon2.hash('admin'), 'admin'],
    ['author@artist.fr', 'artist', await argon2.hash('pizza'), 'author'],
    ['user@lambda.fr', 'lambda', await argon2.hash('pizza'), 'user']
  ])
