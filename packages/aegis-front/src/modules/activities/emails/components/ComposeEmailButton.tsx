import { useComposeEmailForTargetRecord } from '@/activities/emails/hooks/useComposeEmailForTargetRecord';
import { IconPlus } from 'aegis-ui/display';
import { LightIconButton } from 'aegis-ui/input';

export const ComposeEmailButton = () => {
  const { openComposer, loading } = useComposeEmailForTargetRecord();

  return (
    <LightIconButton
      Icon={IconPlus}
      accent="tertiary"
      size="small"
      onClick={openComposer}
      disabled={loading}
    />
  );
};
