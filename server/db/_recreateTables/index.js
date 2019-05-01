const consola = require('consola');

const actions = [
	['dropTables', require('./_dropTables.js')],
	['createSchemaAndType', require('./_createSchemaAndType.js')],
	['createTables', require('./_createTables.js')],
	['doTriggers', require('./_createAndApplyTriggers.js')],
	['populateTables', require('./_populateTables.js')]
];
const { confirm } = require('./../../utils');

(async () => {
	if (process.argv[2] === '-y' || await confirm('Database will be ERASED, are you sure ?')) {
		for (const [name, action] of actions)
			await action()
				.then((x) => {
					consola.success(name.replace(/^\w/, x => x.toUpperCase()));
				})
				.catch((e) => {
					console.log('Abort', e);
				});
		consola.ready({
			message: 'Database is ready',
			badge: true,
			date: Date.now()
		});
	}
})();
