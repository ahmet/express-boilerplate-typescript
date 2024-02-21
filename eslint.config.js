// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import jestPlugin from 'eslint-plugin-jest'
import importSort from 'eslint-plugin-simple-import-sort'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.test.*"],
    ...jestPlugin.configs['flat/recommended'],
  },
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        project: true
      }
    }
  },
  {
    plugins: {
      "simple-import-sort": importSort
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error"
    }
  }
)
