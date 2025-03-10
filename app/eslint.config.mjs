import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest, gtag: 'readonly', },
    },
    plugins: {
      jest,
    },
    rules: {
      "jest/no-conditional-expect": "warn",
      // "jest/no-try-expect": "warn",
    },
  },
  pluginJs.configs.recommended,
	{
		rules: {
			"no-unused-vars": "warn",
		}
	}
];
