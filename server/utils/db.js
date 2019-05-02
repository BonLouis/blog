const { addChar } = require('./misc');

module.exports = {
	/**
   * @param {String} query
   * @param {Array} params
   *
   * Print query string and args in a fancy manner
   * when process.env.DEBUG is truthy
   */
	prettyQuery (query, params, error) {
		console.log(`\n########## ${error ? 'ERROR' : 'DEBUG'} ##########`);
		console.log('#');
		console.log(addChar(query));
		if (params && params.length) {
			console.log('#');
			console.log('#', '~~~~~~~~~~~~~~~~~~~~~~~~~');
			console.log('#');
			for (const [index, param] of params.entries())
				console.log(addChar(`$${index + 1} :\t${param}`));
		}
		if (error) console.log(addChar(error));
		console.log('#');
		console.log(`######## END ${error ? 'ERROR' : 'DEBUG'} ########\n`);
	},
	prettyError (query, params, error) {
		module.exports.prettyQuery(query, params, error);
	}
};
