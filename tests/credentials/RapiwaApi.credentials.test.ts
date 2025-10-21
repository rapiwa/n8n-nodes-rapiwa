/**
 * @fileoverview Unit tests for RapiwaApi.credentials.ts
 */

import { RapiwaApi } from '../../credentials/RapiwaApi.credentials';

describe('RapiwaApi Credentials', () => {
	const credentials = new RapiwaApi();

	it('should have correct name and displayName', () => {
		expect(credentials.name).toBe('rapiwaApi');
		expect(credentials.displayName).toBe('Rapiwa API');
	});

	it('should define API Key property', () => {
		const apiKeyProperty = credentials.properties.find((p) => p.name === 'apiKey');
		expect(apiKeyProperty).toBeDefined();
		expect(apiKeyProperty?.type).toBe('string');
	});

	it('should have valid authenticate definition', () => {
		expect(credentials.authenticate).toBeDefined();
		expect(credentials.authenticate.type).toBe('generic');
		expect(credentials.authenticate.properties?.headers?.Authorization).toContain('Bearer');
	});

	it('should define a valid test request', () => {
		expect(credentials.test).toBeDefined();
		expect(credentials.test.request?.url).toBe('https://app.rapiwa.com/api/verify-device-key');
		expect(credentials.test.request?.method).toBe('GET');
	});
});
