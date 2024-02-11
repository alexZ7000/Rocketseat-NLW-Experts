import typescriptEslint from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";

export default [{
    plugin: { typescriptEslint },
    rules: {
        indent: "error"
        }
    },
    eslintConfigPrettier
];