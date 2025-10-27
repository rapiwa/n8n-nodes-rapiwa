import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';

export class Rapiwa implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Rapiwa',
		name: 'rapiwa',
		icon: 'file:rapiwa-logo.svg',
		group: ['output'],
		version: 1,
		description: 'Send and verify WhatsApp numbers via Rapiwa API',
		defaults: { name: 'Rapiwa' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'rapiwaApi', required: true }],

		properties: [
			// ===== OPERATION =====
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Send WhatsApp Message',
						value: 'sendWhatsAppMessage',
						description: 'Send WhatsApp messages immediately',
						action: 'Send whatsapp message',
					},
					{
						name: 'Verify WhatsApp Number',
						value: 'verifyWhatsAppNumber',
						description: 'Check if a WhatsApp number is valid or active',
						action: 'Verify whatsapp number',
					},
				],
				default: 'sendWhatsAppMessage',
				required: true,
			},

			// ===== COMMON FIELD =====
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				default: '',
				placeholder: '(e.g. 88017XXXXXXXX)',
				description: 'Recipient number with country code (e.g. 88017XXXXXXXX)',
				required: true,
			},

			// ===== SEND MESSAGE FIELDS =====
			{
				displayName: 'Product Operation',
				name: 'productOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { operation: ['sendWhatsAppMessage'] } },
				options: [
					{ name: 'Welcome Message', value: 'welcome' },
					{ name: 'Promotional Offer', value: 'promo' },
				],
				default: 'welcome',
				required: true,
			},
			{
				displayName: 'Message Type',
				name: 'messageType',
				type: 'options',
				displayOptions: { show: { operation: ['sendWhatsAppMessage'] } },
				options: [
					{ name: 'Text', value: 'text' },
					{ name: 'Image', value: 'image' },
					{ name: 'Video', value: 'video' },
					{ name: 'Document', value: 'document' },
				],
				default: 'text',
				required: true,
			},
			{
				displayName: 'Message (Text or Caption)',
				name: 'message',
				type: 'string',
				typeOptions: { alwaysOpenEditWindow: true },
				default: 'Hello from Rapiwa!',
				placeholder: 'Hello from Rapiwa!',
				description: 'Text message body or caption for media',
				displayOptions: {
					show: {
						operation: ['sendWhatsAppMessage'],
						messageType: ['text', 'image', 'video'],
					},
				},
				required: true,
			},
			{
				displayName: 'Media URL',
				name: 'mediaUrl',
				type: 'string',
				default: '',
				placeholder: 'https://example.com/file.jpg',
				description: 'Public URL for media (image, video, or document)',
				displayOptions: {
					show: {
						operation: ['sendWhatsAppMessage'],
						messageType: ['image', 'video', 'document'],
					},
				},
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const credentials = await this.getCredentials('rapiwaApi');
		const apiKey = credentials.apiKey as string;

		const getMimeType = (type: string): string => {
			switch (type) {
				case 'image':
					return 'image/jpeg';
				case 'video':
					return 'video/mp4';
				case 'document':
					return 'application/pdf';
				default:
					return '';
			}
		};

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;
			const rawNumber = this.getNodeParameter('number', i);
			const number = String(rawNumber).replace(/\D/g, '');
			const originalNumber = String(rawNumber);

			// ===== VERIFY NUMBER =====
			if (operation === 'verifyWhatsAppNumber') {
				if (originalNumber.endsWith('@lid')) {
					returnData.push({
						success: true,
						number: originalNumber,
						exists: true,
						message: 'Skipped verification — already verified (ends with @lid)',
						jid: originalNumber,
					});
					continue;
				}

				const body = { number };
				const options = {
					method: 'POST' as const,
					url: 'https://app.rapiwa.com/api/verify-whatsapp',
					body,
					json: true,
					headers: { Authorization: `Bearer ${apiKey}` },
				};

				try {
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'rapiwaApi',
						options,
					);

					returnData.push({
						success: !!response.success,
						number: response.data?.number || number,
						exists: !!response.data?.exists,
						message: response.data?.message,
						jid: response.data?.jid || null,
					});
				} catch (error: any) {
					returnData.push({
						success: false,
						number,
						exists: false,
						error: error.message,
					});
				}

				continue;
			}

			// ===== SEND MESSAGE =====
			if (operation === 'sendWhatsAppMessage') {
				const finalNumber = String(rawNumber).endsWith('@lid') ? String(rawNumber) : number;

				const messageType = this.getNodeParameter('messageType', i) as string;
				const productOperation = this.getNodeParameter('productOperation', i) as string;
				const body: IDataObject = {
					number: finalNumber,
					message_type: messageType,
					productOperation,
				};

				if (messageType === 'text') {
					body.message = this.getNodeParameter('message', i) as string;
				} else if (['image', 'video'].includes(messageType)) {
					body.message = this.getNodeParameter('message', i) as string;
					body.media_url = this.getNodeParameter('mediaUrl', i) as string;
					body.mimetype = getMimeType(messageType);
				} else if (messageType === 'document') {
					const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;
					body.media_url = mediaUrl;
					body.file_name = mediaUrl.split('/').pop() || 'file.pdf';
					body.mimetype = getMimeType(messageType);
				}

				const options = {
					method: 'POST' as const,
					url: 'https://app.rapiwa.com/api/send-message',
					body,
					json: true,
					headers: { Authorization: `Bearer ${apiKey}` },
				};

				try {
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'rapiwaApi',
						options,
					);

					if (response.success === false) {
						throw new NodeApiError(this.getNode(), response, {
							message: response.error || 'Rapiwa API returned success: false',
						});
					}
					returnData.push(response as IDataObject);
				} catch (error: any) {
					if (this.continueOnFail()) {
						returnData.push({ error: error.message });
						continue;
					}
					throw error;
				}
			}
		}

		return [returnData.map((d) => ({ json: d }))];
	}
}
