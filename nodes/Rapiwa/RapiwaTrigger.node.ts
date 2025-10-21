import {
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

export class RapiwaTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Rapiwa Incoming message Trigger',
		name: 'rapiwaTrigger',
		icon: 'file:rapiwa.svg',
		group: ['trigger'],
		version: 1,
		subtitle: 'Incoming Message',
		description: 'Starts the workflow when Rapiwa sends a webhook',
		defaults: { name: 'Rapiwa Trigger' },
		credentials: [{ name: 'rapiwaApi', required: true }],
		inputs: [],
		outputs: ['main'],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'rapiwa-webhook',
			},
		],
		properties: [
			{
				displayName: 'HTTP Method',
				name: 'httpMethod',
				type: 'options',
				options: [
					{
						name: 'POST',
						value: 'POST',
					},
				],
				default: 'POST',
				description: 'The HTTP method to listen to',
			},
			{
				displayName: 'Respond',
				name: 'responseMode',
				type: 'options',
				options: [
					{
						name: 'Immediately',
						value: 'onReceived',
						description: 'As soon as the request is received',
					},
					{
						name: 'When Last Node Finishes',
						value: 'lastNode',
						description: 'After the last node in the workflow finishes executing',
					},
				],
				default: 'onReceived',
				description: 'When to respond to the webhook',
			},
		],
	};

	// ===== Execute webhook trigger =====
	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const body = req.body || {};
		const headers = req.headers;

		this.logger.info('📩 Rapiwa Webhook received', { headers, body });

		return {
			webhookResponse: { success: true, message: 'Received OK' },
			workflowData: [this.helpers.returnJsonArray([body])],
		};
	}
}
