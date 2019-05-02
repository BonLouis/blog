class ArgumentsError extends Error {
	constructor (...args) {
		const s = args.length > 1 ? 's' : '';
		const parsedArgs = args.map(x => `"${x}"`).join(', ');
		super(`missing ${args.length} argument${s} (${parsedArgs})`);
		this.name = 'ArgumentsError';
	}
}
module.exports = {
	ArgumentsError
};
