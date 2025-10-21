import {
	IAuthenticateGeneric,
	ICredentialType,
	ICredentialTestRequest,
	INodeProperties,
} from 'n8n-workflow';

export class RapiwaApi implements ICredentialType {
	name = 'rapiwaApi';
	displayName = 'Rapiwa API';
	documentationUrl = 'https://docs.rapiwa.com';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	// Attach API Key as Bearer token
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	// Test credentials with verification endpoint
	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			url: 'https://app.rapiwa.com/api/verify-device-key',
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};
}
