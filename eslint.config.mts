import { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js'
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint'
import { flatConfig as flatNextConfig } from '@next/eslint-plugin-next'

const eslintConfig = defineConfig([
  eslint.configs.recommended,
  reactPlugin.configs.flat.recommended, // This is not a plugin object, but a shareable config object
  reactPlugin.configs.flat['jsx-runtime'], // Add this if you are using React 17+
  {
    settings: {
      react: {
        version: "detect",
      },
    }
  },
  reactHooks.configs['recommended-latest'],
  tseslint.configs.recommendedTypeChecked,
  // tseslint.configs.stylisticTypeChecked, // Some opinionated rules, but type-checked
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  flatNextConfig.coreWebVitals as Linter.Config, // TODO remove as any after next-plugin-next is updated
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ]
    }
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      ".pnpm-store/**",
      "next-env.d.ts",
      "eslint.config.mts",
      "postcss.config.mjs",
    ],
  },
]);

export default eslintConfig;
