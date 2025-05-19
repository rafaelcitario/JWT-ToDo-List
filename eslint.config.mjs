import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';


export default defineConfig([
	{ files: ['**/*.{js,mjs,cjs,ts}'], plugins: { js }, extends: ['js/recommended'] },
	{ files: ['**/*.{js,mjs,cjs,ts}'], languageOptions: { globals: globals.node } },
	tseslint.configs.recommended,
	{
		rules: {
			'no-unused-vars': 'warn',
			'no-undef': 'warn',
			'quotes': ['error', 'single'],
			'no-console': 'warn',
			'no-restricted-syntax': [
				'error',
				{
					'selector': 'CallExpression[callee.object.name=\'console\'][callee.property.name!=/^(log|warn|error|info|trace)$/]',
					'message': 'Unexpected property on console object was called'
				}
			],
			'sort-imports': ['error', {
				'ignoreCase': false,
				'ignoreDeclarationSort': false,
				'ignoreMemberSort': false,
				'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
				'allowSeparatedGroups': false
			}],

		}
	}

]);
