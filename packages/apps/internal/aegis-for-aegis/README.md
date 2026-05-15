This is a [Aegis](https://aegis.com) application bootstrapped with [`create-aegis-app`](https://www.npmjs.com/package/create-aegis-app).

## Overview

**Aegis for Aegis** is the official internal Aegis app. It is organized into modules, each integrating a third-party service with Aegis.

### Resend module (`src/modules/resend/`)

Two-way sync between Aegis and the [Resend](https://resend.com) email platform. The module syncs contacts, segments, templates, broadcasts, and emails.

**Inbound (Resend -> Aegis):**

- A cron job runs every 5 minutes to pull all entities from the Resend API
- A webhook endpoint receives real-time events for contacts and emails

**Outbound (Aegis -> Resend):**

- Database event triggers push contact and segment changes back to Resend when records are created, updated, or deleted in Aegis

## Getting Started

### 1. Install and run the app

```bash
yarn aegis dev
```

This registers the app with your local Aegis instance at `http://localhost:3000/settings/applications`.

### 2. Configure app variables

In Aegis, go to **Settings > Applications > Aegis for Aegis** and set:

- **RESEND_API_KEY** -- Your Resend API key. Create one at https://resend.com/api-keys (full access recommended).
- **RESEND_WEBHOOK_SECRET** -- The signing secret for verifying inbound webhooks (see "Webhook setup" below).

### 3. Webhook setup

The app exposes an HTTP endpoint at `/s/webhook/resend` that receives Resend webhook events. To connect it:

1. Go to https://resend.com/webhooks
2. Click **Add webhook**
3. Set the **Endpoint URL** to your Aegis server's public URL + `/s/webhook/resend` (e.g. `https://your-domain.com/s/webhook/resend`)
4. Set **Events types** to **All Events**
5. Click **Add**
6. Copy the **signing secret** Resend displays and paste it into the `RESEND_WEBHOOK_SECRET` app variable in Aegis

The webhook handles:

- **Contact events** (`contact.created`, `contact.updated`, `contact.deleted`) -- upserts/deletes Resend contact records in Aegis
- **Email events** (`email.sent`, `email.delivered`, `email.bounced`, `email.opened`, `email.clicked`, etc.) -- updates delivery status on Resend email records in real-time
- **Domain events** -- logged and skipped (no domain object in the app yet)

### 4. Testing webhooks locally

Install the [Resend CLI](https://resend.com/docs/resend-cli):

```bash
brew install resend/cli/resend
```

Or via npm if Homebrew has issues:

```bash
npm install -g resend-cli
```

Authenticate:

```bash
resend login
```

Start the webhook listener with forwarding to your local Aegis server:

```bash
resend webhooks listen --forward-to http://localhost:3000/s/webhook/resend
```

The CLI will:

1. Create a public tunnel automatically
2. Register a temporary webhook in Resend pointing to that tunnel
3. Forward incoming events (with Svix signature headers) to your local Aegis server
4. Display events in the terminal as they arrive
5. Clean up the temporary webhook when you press Ctrl+C

To trigger test events, create or update a contact in the [Resend dashboard](https://resend.com/contacts), or send a test email.

## Sync behavior

### Inbound sync

| Source | Mechanism | Entities |
|---|---|---|
| Cron (every 5 min) | Polls Resend API, upserts into Aegis | Contacts, segments, templates, broadcasts, emails |
| Webhook (real-time) | Receives Resend events via HTTP | Contacts, emails |

### Outbound sync

| Aegis action | Resend API call |
|---|---|
| Create contact | `contacts.create()` -- writes `resendId` back to Aegis |
| Update contact (name, email, unsubscribed) | `contacts.update()` |
| Delete contact | `contacts.remove()` |
| Create segment | `segments.create()` -- writes `resendId` back to Aegis |
| Delete segment | `segments.remove()` |

### Loop prevention

A `lastSyncedFromResend` field on contact, segment, and email records tracks when data came from Resend. Outbound triggers skip processing when this field is part of the update, preventing infinite echo loops between inbound and outbound sync.

## Commands

Run `yarn aegis help` to list all available commands.

## Learn More

- [Aegis Apps documentation](https://docs.aegis.com/developers/extend/apps/getting-started)
- [twenty-sdk CLI reference](https://www.npmjs.com/package/twenty-sdk)
- [Resend API documentation](https://resend.com/docs)
- [Discord](https://discord.gg/cx5n4Jzs57)
