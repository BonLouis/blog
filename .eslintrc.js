module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'semistandard'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-console': 'off',
    'prefer-template': 2,
		'curly': 0,
		'indent': [
			'error', 'tab',
			{ 'SwitchCase': 1 }
		],
		'one-var': 2,
		'no-tabs': 0,
		'no-console': 0,
		'object-curly-newline': [
			2,
			{ 'multiline': true, 'consistent': true }
		],
		'no-multi-spaces': [
			2,
			{
				'exceptions': {
					'Property': false,
					'VariableDeclarator': true,
					'ImportDeclaration': true
				}
			}
		],
		'spaced-comment': [ 2, 'always', { 'exceptions': ['/'] } ],
  }
}
