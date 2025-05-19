import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	{
		ignores: ['**/*.{js,mjs,cjs}', '**/generated/**'],
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module'
			},
			globals: globals.node // <-- aqui o ESLint entende process, require, etc.
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin
		},
		rules: {
			'no-unused-vars': 'warn',
			'no-undef': 'off', // <-- desliga isso se estiver usando TypeScript
			'quotes': ['error', 'single'],
			'no-console': 'warn',
			'no-restricted-syntax': [
				'error',
				{
					selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
					message: 'Unexpected property on console object was called'
				}
			],
			'sort-imports': ['error', {
				ignoreCase: false,
				ignoreDeclarationSort: false,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
				allowSeparatedGroups: false
			}]
		},
		extends: [
			...tseslint.configs.recommended
		]
	}
]);
