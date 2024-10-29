module.exports = {
  overrides: [
    {
      // TypeScript
      files: ['**/*.ts'],

      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
  ],
};
