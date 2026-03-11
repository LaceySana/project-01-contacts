const js = require('@eslint/js');
const globals = require('globals');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.node }
    },
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    eslintPluginPrettierRecommended
]);
