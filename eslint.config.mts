import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js'
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint'
// import { flatConfig as nextEslintFlatConfig } from '@next/eslint-plugin-next'
// import { FlatCompat } from "@eslint/eslintrc";
// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

const eslintConfig = defineConfig([
  // ...compat.extends("next/core-web-vitals", "next/typescript"),
  eslint.configs.recommended,
  // nextEslintFlatConfig.coreWebVitals,
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
