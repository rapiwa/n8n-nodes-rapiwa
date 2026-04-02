import {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	type NodeConnectionType,
	NodeConnectionTypes,
} from 'n8n-workflow';

export class RapiwaTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Rapiwa Incoming message Trigger',
		name: 'rapiwaTrigger',
		icon: 'file:rapiwa-logo.svg',
		group: ['trigger'],
		version: 1,
		subtitle: 'Incoming Message',
		description: 'Starts the workflow when Rapiwa sends a webhook',
		defaults: { name: 'Rapiwa Trigger' },
		credentials: [{ name: 'rapiwaApi', required: true }],
		inputs: [],
		outputs: [NodeConnectionTypes.Main] as [NodeConnectionType],
		webhooks: [
			{
				name: 'default',
				httpMethod: '={{$parameter["httpMethod"]}}',
				responseMode: '={{$parameter["responseMode"]}}',
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

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const staticData = this.getWorkflowStaticData('node');
				return staticData.webhookUrl !== undefined;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const staticData = this.getWorkflowStaticData('node');
				if (webhookUrl) {
					staticData.webhookUrl = webhookUrl;
					this.logger.info(
						`Rapiwa webhook URL (configure this URL in your Rapiwa dashboard): ${webhookUrl}`,
					);
				}
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const staticData = this.getWorkflowStaticData('node');
				delete staticData.webhookUrl;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const body = req.body || {};
		const headers = req.headers;

		this.logger.info('Rapiwa Webhook received', { headers, body });

		return {
			webhookResponse: { success: true, message: 'Received OK' },
			workflowData: [this.helpers.returnJsonArray([body])],
		};
	}
}
