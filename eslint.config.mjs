import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

export default tseslint.config([
  eslint.configs.recommended,
  {
    plugins: {
      reactPlugin,
      reactHooksPlugin,
      importPlugin,
    },
    ignores: [
      "node_modules",
      "/**/*.d.ts",
      "/**/.next/",
      "/**/dist/",
      "/**/public/",
      "/**/generated/",
      "/**/components/ui/",
    ],
  },
  tseslint.configs.recommended,
]);
