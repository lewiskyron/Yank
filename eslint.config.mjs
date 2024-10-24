import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: [
			"yank_extension/src/**/*.{js,ts,tsx}",
			"yank_web_app/src/**/*.{js,ts,tsx}",
		],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			react: reactPlugin,
		},
		rules: {
			"react/jsx-uses-react": "error",
			"react/jsx-uses-vars": "error",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		ignores: [
			"build/",
			"dist/",
			".next/**/*",
			"dist",
			".eslintrc.cjs",
			"yank_extension/src/components/",
		],
	},
];
