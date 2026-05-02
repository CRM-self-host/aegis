import { getClient } from 'src/modules/shared/aegis-client';

export async function updatePullRequest(
  id: string,
  data: Record<string, unknown>,
): Promise<void> {
  const client = getClient();
  await client.mutation({
    updatePullRequest: {
      __args: { id, data },
      id: true,
    },
  });
}
