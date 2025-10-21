const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',

	// Look for any .test.ts files inside tests folder (recursively)
	testMatch: ['**/tests/**/*.test.ts'],

	transform: {
		...tsJestTransformCfg,
	},

	moduleFileExtensions: ['ts', 'js', 'json'],
};
