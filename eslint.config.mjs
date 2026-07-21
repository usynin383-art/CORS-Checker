import ts from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: [".next/*", "node_modules/*", "dist/*"] // Во Flat Config используется ключ ignores вместо ignoredFiles
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": ts.plugin,
      "@next/next": nextPlugin,
    },
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...ts.configs.recommended.reduce((acc, config) => ({ ...acc, ...config.rules }), {}),
      
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "no-empty": "error"
    },
  },
  eslintConfigPrettier,
];
