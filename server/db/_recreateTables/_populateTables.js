const argon2 = require('argon2');
const { LoremIpsum } = require('lorem-ipsum');
const db = require('../');
const lorem = new LoremIpsum({
	sentencesPerParagraph: {
		max: 8,
		min: 4
	},
	wordsPerSentence: {
		max: 4,
		min: 1
	}
});
module.exports = async () => {
	db.createUser([
		['admin@master.fr', 'master', await argon2.hash('admin'), 'admin'],
		['author@artist.fr', 'artist', await argon2.hash('pizza'), 'author'],
		['user@lambda.fr', 'lambda', await argon2.hash('pizza'), 'user']
	]);

	await db.createCategory([
		['Nature', 'nature'],
		['Sport', 'sport'],
		['Food', 'food'],
		['Music', 'music'],
		['Code', 'code']
	]);

	db.createPost([
		[lorem.generateSentences(1), lorem.generateParagraphs(10), 2, 3],
		[lorem.generateSentences(1), lorem.generateParagraphs(10), 2, 3],
		[lorem.generateSentences(1), lorem.generateParagraphs(10), 2, 3],
		[lorem.generateSentences(1), lorem.generateParagraphs(10), 2, 3],
		[lorem.generateSentences(1), lorem.generateParagraphs(10), 2, 3],
		[lorem.generateSentences(1), lorem.generateParagraphs(10), 2, 3],
		[lorem.generateSentences(1), lorem.generateParagraphs(10), 2, 3]
	]);
};
