import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  eslintConfigPrettier,

  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      
      "@typescript-eslint/no-explicit-any": "error",
      
      "no-empty": "error"
    }
  }
];

export default eslintConfig;
