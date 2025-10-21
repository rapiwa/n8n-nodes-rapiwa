<p align="center">
  <img src="./nodes/Rapiwa/rapiwa-logo.svg" alt="Rapiwa Logo" width="120" height="120" />
</p>

<h1 align="center">n8n-nodes-rapiwa</h1>

<p align="center">
  <b>Official Rapiwa integration for n8n</b>  
  <br />
  Send and verify WhatsApp messages, and receive incoming webhooks — all powered by the <a href="https://app.rapiwa.com" target="_blank">Rapiwa</a>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/n8n-nodes-rapiwa">
    <img src="https://img.shields.io/npm/v/n8n-nodes-rapiwa.svg?style=flat-square" alt="npm version" />
  </a>
  <a href="https://github.com/WhatsAble/n8n-nodes-rapiwa/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License: MIT" />
  </a>
  <a href="https://community.n8n.io">
    <img src="https://img.shields.io/badge/n8n-community-green?style=flat-square" alt="n8n Community" />
  </a>
</p>

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Credentials Setup](#credentials-setup)
- [Common Use Cases](#common-use-cases)
- [Node Operations](#node-operations)
  - [Send WhatsApp Message](#send-whatsapp-message)
  - [Verify WhatsApp Number](#verify-whatsapp-number)
- [Trigger: Incoming Webhooks](#trigger-incoming-webhooks)
- [Support](#support)
- [License](#license)
- [Resources](#resources)
- [Running Locally](#running-locally)

---

## Overview

**Rapiwa Node for n8n** allows you to integrate the [Rapiwa API](https://app.rapiwa.com) directly into your n8n workflows.

You can:

- Send automated WhatsApp messages (text, image, video, document)
- Verify whether a number is active on WhatsApp
- Trigger workflows from incoming Rapiwa webhooks

This package follows the official [n8n custom node development standards](https://docs.n8n.io/integrations/creating-nodes/).

---

## Features

- **Send WhatsApp Messages** — Send text or media messages directly via the Rapiwa API.
- **Verify Numbers** — Check if a given phone number is active on WhatsApp.
- **Incoming Webhooks** — Trigger n8n workflows when messages arrive.
- **Secure Authentication** — Uses your Rapiwa API Key with Bearer Token.
- **Error Handling** — Follows n8n’s native error behavior and `continueOnFail()` support.

---

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

To install this node in your n8n environment:

### From npm:

```bash
npm install n8n-nodes-rapiwa
```

## Credentials Setup

Before using the node, you must configure your Rapiwa API Key:

1. In n8n, navigate to **Credentials** → **New** → **Rapiwa API.**
2. Enter your API key (found in your [Rapiwa Dashboard](https://app.rapiwa.com) )
3. Click Test — it should verify successfully.

> **Note:** Keep your API key secure and never share it publicly.

---

## Common Use Cases

- **Smart Support Automation:** Instantly respond to customers, automate FAQs, and collect feedback via WhatsApp.
- **Instant Business Alerts:** Send real-time updates, reminders, and critical notifications directly to users.
- **AI Chat Assistants:** Handle inquiries, returns, and support 24/7 with AI-driven bots.
- **Lead Nurturing:** Automate personalized follow-ups and turn prospects into customers seamlessly.
- **E-Commerce Updates:** Send order, shipping, and delivery alerts to boost customer engagement.
- **Analytics & Insights:** Sync WhatsApp data with your CRM for real-time performance tracking.

---

## Node Operations

### 1\. Send WhatsApp Message

Send WhatsApp messages to your users directly from n8n.

**Fields:**

- **Number** → Recipient’s number (e.g. 88017XXXXXXXX)
- **Product Operation** → Choose between Welcome Message or Promotional Offer
- **Message Type** → Text, Image, Video, or Document
- **Message** → Text body or caption (for media)
- **Media URL** → Public link for the media file

**Example use case:**

- Triggered when a new order is placed
- Sends a WhatsApp confirmation message to the customer

### 2\. Verify WhatsApp Number

Check if a given number is registered on WhatsApp before sending messages.

**Fields:**

- **Number** → Recipient’s number (e.g. 88017XXXXXXXX)

The node will return:

- exists: true/false
- jid (WhatsApp unique ID)
- message (response description)

**Example use case:**

- Validate WhatsApp numbers before sending campaigns
- Clean your contact list automatically

---

## Trigger: Incoming Webhooks

**Rapiwa Trigger:** Incoming Webhooks allows you to **receive incoming WhatsApp messages** directly into n8n workflows.

Use this to:

- Build chatbots
- Capture inbound messages for automation
- Log WhatsApp replies in databases or CRMs

---

## Support

For technical support and assistance:

- **Email Support**: Contact our dedicated support team
- **Implementation Help**: Get expert assistance with workflows

For enterprise-level support or custom solutions, contact our solution engineers at sales@rapiwa.com

---

## License

[MIT](LICENSE.md)

---

## Resources

- [Rapiwa Website](https://rapiwa.com)
- [n8n Documentation](https://docs.n8n.io)
- [Rapiwa n8n Overview](https://docs.rapiwa.com/n8n.html)

---

## Running Locally

To run and test this node on your local machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/rapiwa/n8n-nodes-rapiwa
   cd n8n-nodes-rapiwa
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Build the project**
   ```bash
   npm run build
   ```
4. **Install the node into your local n8n instance:**
   ```bash
   npm link n8n-nodes-rapiwa
   ```
   > **Note:** Unit tests are included to ensure code quality. Please run tests before submitting a pull request.
5. **Start n8n:**
   ```bash
   n8n start
   ```
6. **Test your node**
   - Open n8n in your browser (usually at `http://localhost:5678`)
   - Create a workflow and add your custom node to test its functionality

> **Note:** Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed on your machine.

---

### Reporting Issues

- If you find a bug or have a feature request, please [open an issue](https://github.com/hasibulmahi/n8n-nodes-rapiwa/issues) with details and steps to reproduce.

### Code of Conduct

- Please be respectful and follow our [Code of Conduct](CODE_OF_CONDUCT.md) when participating in this project.
