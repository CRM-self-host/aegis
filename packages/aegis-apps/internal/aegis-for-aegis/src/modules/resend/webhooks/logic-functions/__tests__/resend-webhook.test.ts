import { CoreApiClient } from 'aegis-client-sdk/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@modules/resend/shared/utils/find-or-create-person', () => ({
  findOrCreatePerson: vi.fn(),
}));

vi.mock('@modules/resend/shared/utils/find-record-by-resend-id', () => ({
  findRecordByResendId: vi.fn(),
}));

vi.mock('@modules/resend/shared/utils/find-aegis-ids-by-resend-id', () => ({
  findAegisIdsByResendId: vi.fn(),
}));

import { findOrCreatePerson } from '@modules/resend/shared/utils/find-or-create-person';
import { findRecordByResendId } from '@modules/resend/shared/utils/find-record-by-resend-id';
import { findAegisIdsByResendId } from '@modules/resend/shared/utils/find-aegis-ids-by-resend-id';
import { handleContactCreatedOrUpdated } from '@modules/resend/webhooks/logic-functions/resend-webhook';

const mockFindOrCreatePerson = findOrCreatePerson as unknown as ReturnType<
  typeof vi.fn
>;
const mockFindRecordByResendId = findRecordByResendId as unknown as ReturnType<
  typeof vi.fn
>;
const mockFindAegisIdsByResendId =
  findAegisIdsByResendId as unknown as ReturnType<typeof vi.fn>;

type MutationMock = ReturnType<typeof vi.fn>;

const buildClient = (mutation: MutationMock): CoreApiClient =>
  ({
    mutation,
  }) as unknown as CoreApiClient;

const baseContactEvent = {
  id: 'resend-contact-1',
  email: 'Foo@Example.com',
  first_name: 'Foo',
  last_name: 'Bar',
  unsubscribed: false,
  segment_ids: [] as string[],
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
};

describe('handleContactCreatedOrUpdated (webhook)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFindOrCreatePerson.mockResolvedValue('aegis-person-1');
  });

  it('resolves the first segment_ids entry to a Aegis segment id and inlines it on create', async () => {
    mockFindRecordByResendId.mockResolvedValue(undefined);
    mockFindAegisIdsByResendId.mockResolvedValue(
      new Map([['resend-segment-1', 'aegis-segment-1']]),
    );

    const mutation = vi.fn(async () => ({
      createResendContact: { id: 'aegis-contact-1' },
    }));

    const result = await handleContactCreatedOrUpdated(buildClient(mutation), {
      ...baseContactEvent,
      segment_ids: ['resend-segment-1', 'resend-segment-2'],
    });

    expect(mockFindAegisIdsByResendId).toHaveBeenCalledWith(
      expect.anything(),
      'resendSegments',
      ['resend-segment-1'],
    );

    expect(mutation).toHaveBeenCalledTimes(1);

    const args = (
      mutation.mock.calls[0] as unknown as Array<{
        createResendContact: { __args: { data: Record<string, unknown> } };
      }>
    )[0].createResendContact.__args;

    expect(args.data.segmentId).toBe('aegis-segment-1');
    expect(args.data.personId).toBe('aegis-person-1');
    expect(args.data.resendId).toBe('resend-contact-1');
    expect(args.data.email).toEqual({
      primaryEmail: 'foo@example.com',
      additionalEmails: null,
    });

    expect(result).toEqual({
      action: 'created',
      aegisId: 'aegis-contact-1',
      resendId: 'resend-contact-1',
      personId: 'aegis-person-1',
    });
  });

  it('omits segmentId when the first segment is not yet known to Aegis', async () => {
    mockFindRecordByResendId.mockResolvedValue(undefined);
    mockFindAegisIdsByResendId.mockResolvedValue(new Map());

    const mutation = vi.fn(async () => ({
      createResendContact: { id: 'aegis-contact-1' },
    }));

    await handleContactCreatedOrUpdated(buildClient(mutation), {
      ...baseContactEvent,
      segment_ids: ['unknown-segment'],
    });

    const args = (
      mutation.mock.calls[0] as unknown as Array<{
        createResendContact: { __args: { data: Record<string, unknown> } };
      }>
    )[0].createResendContact.__args;

    expect(args.data.segmentId).toBeUndefined();
  });

  it('does not look up segments when segment_ids is empty and inlines segmentId on update', async () => {
    mockFindRecordByResendId.mockResolvedValue('aegis-contact-existing');

    const mutation = vi.fn(async () => ({
      updateResendContact: { id: 'aegis-contact-existing' },
    }));

    await handleContactCreatedOrUpdated(buildClient(mutation), {
      ...baseContactEvent,
      segment_ids: [],
    });

    expect(mockFindAegisIdsByResendId).not.toHaveBeenCalled();

    const args = (
      mutation.mock.calls[0] as unknown as Array<{
        updateResendContact: { __args: { data: Record<string, unknown> } };
      }>
    )[0].updateResendContact.__args;

    expect(args.data.segmentId).toBeUndefined();
  });
});
