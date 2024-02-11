import typescriptEslint from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    {
        plugins: { typescriptEslint },
        rules: {
            indent: "error",
        },
    },
    eslintConfigPrettier,
];
