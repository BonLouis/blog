require('dotenv').config({
  path: require('path').join(__dirname, '../../.env')
})
const argon2 = require('argon2')
const { Pool } = require('pg')
const format = require('pg-format')
const { ArgumentsError } = require('../errors')
const { addChar } = require('../utils')
const queries = require('./queries')
const pool = new Pool({
  // number of milliseconds to wait before timing out when connecting a new client
  // by default this is 0 which means no timeout
  connectionTimeoutMillis: 0,

  // number of milliseconds a client must sit idle in the pool and not be checked out
  // before it is disconnected from the backend and discarded
  // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
  idleTimeoutMillis: 1000,

  // maximum number of clients the pool should contain
  // by default this is set to 10.
  max: 10
})

/**
 * @param {String} query
 * @param {Array} params
 *
 * Print query string and args in a fancy manner
 * when process.env.DEBUG is truthy
 */
function prettyQuery(query, params, error) {
  console.log(`\n########## ${error ? 'ERROR' : 'DEBUG'} ##########`)
  console.log('#')
  console.log(addChar(query))
  if (params && params.length) {
    console.log('#')
    console.log('#', '~~~~~~~~~~~~~~~~~~~~~~~~~')
    console.log('#')
    for (const [index, param] of params.entries())
      console.log(addChar(`$${index + 1} :\t${param}`))
  }
  if (error) console.log(addChar(error))
  console.log('#')
  console.log(`######## END ${error ? 'ERROR' : 'DEBUG'} ########\n`)
}
function prettyError(query, params, error) {
  prettyQuery(query, params, error)
}
module.exports = {
  query: (text, params) =>
    pool
      .query(text, params)
      .then(x => {
        if (process.env.DEBUG) {
          prettyQuery(text, params)
        }
        return x
      })
      .catch(error => prettyError(text, params, error)),
  createUser: params => {
    if (Array.isArray(params[0])) {
      return (async () => {
        for (const param of params)
          await module.exports.query(queries.createUser, param)
      })()
    }
    return module.exports.query(queries.createUser, params)
  },
  findUser: ({ column = 'login', value } = {}) => {
    if (!value) throw new ArgumentsError('value')
    return module.exports
      .query(format(queries.findUser, column, value))
      .then(({ rows }) => rows[0])
  },
  checkPassword: ({ user, attemptPassword, column = 'login' } = {}) => {
    if (!user) throw new ArgumentsError('Undefined user')
    if (!attemptPassword)
      throw new ArgumentsError('Undefined password to check')
    module.exports.findUser()
    argon2.verify()
  }
}
