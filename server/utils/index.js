const readline = require('readline')
const consola = require('consola')

module.exports = {
  confirm: question =>
    new Promise(resolve => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
      consola.warn(question)
      rl.question("Yes: ['y', 'yes', 'o', 'oui']\nNo: other\n", answer => {
        rl.close()
        if (!['y', 'yes', 'o', 'oui'].includes(answer.toLowerCase())) {
          consola.fatal('Abort operation')
          resolve(false)
        }
        resolve(true)
      })
    }),
  addChar: (string, char = '# ') => {
    if (string instanceof Error) {
      return module.exports.addChar(string.stack)
    }
    return string
      .replace(/^\s+|\s+$/g, '')
      .replace(/\n/g, `\n${char}`)
      .replace(/^/, `${char}`)
  }
}
