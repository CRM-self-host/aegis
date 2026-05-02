import type { EmailsField, FullNameField } from 'aegis-sdk/define';

export type ResendContactRecord = {
  id: string;
  resendId?: string;
  email?: EmailsField;
  name?: FullNameField;
  unsubscribed?: boolean;
  lastSyncedFromResend?: string;
};
