module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
    ],
    parser: "@typescript-eslint/parser",
    ignorePatterns: ["*.js"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
    },
    // plugins: ["react-hooks"],
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            extends: ["plugin:@typescript-eslint/strict"],
            parserOptions: {
                project: ["./tsconfig.json"],
            },
            rules: {
                " @typescript-eslint/no-unused-vars": "off"
            },
        },
    ],
};
