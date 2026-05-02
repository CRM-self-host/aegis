import { type EmailRecipients } from 'aegis-shared/workflow';

export type WorkflowSendEmailActionInput = {
  connectedAccountId: string;
  recipients: EmailRecipients;
  subject?: string;
  body?: string;
  inReplyTo?: string;
};
