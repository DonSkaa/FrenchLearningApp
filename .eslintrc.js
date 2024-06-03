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
    "plugin:mobx/recommended",
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
  plugins: ["mobx"],
  rules: {
    "react/no-unescaped-entities": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
  // overrides: [
  //   {
  //     files: ["*.ts", "*.tsx"],
  //     extends: ["plugin:@typescript-eslint/strict"],
  //     parserOptions: {
  //       project: ["./tsconfig.json"],
  //     },
  //     rules: {
  //       "@typescript-eslint/no-unused-vars": "off",
  //     },
  //   },
  // ],
};
