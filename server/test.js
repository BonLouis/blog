const argon2 = require('argon2')
const consola = require('consola')
const db = require('./db')

consola.ready({
  message: `Yay`,
  badge: true
})
// ;(async () => {
//   const user = await db.findUser({ value: 'lambda' })
//   return argon2.verify(user.password, 'pizza')
// })().then(x => {
//   console.log(x)
// })
