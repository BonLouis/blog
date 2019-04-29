const consola = require('consola')
const { confirm } = require('../../utils')

const actions = ['drop', 'create', 'populate'].map(x => [
  x,
  require(`./_${x}Tables`)
])

;(async () => {
  if (await confirm('Database will be ERASED, are you sure ?')) {
    for (const [name, action] of actions)
      await action().then(x => {
        consola.success(name.replace(/^\w/, x => x.toUpperCase()))
      })
    consola.ready({
      message: 'Database is ready',
      badge: true,
      date: Date.now()
    })
  }
})()
