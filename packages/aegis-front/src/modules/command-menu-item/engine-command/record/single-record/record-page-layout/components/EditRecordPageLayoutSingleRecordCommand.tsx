import { HeadlessEngineCommandWrapperEffect } from '@/command-menu-item/engine-command/components/HeadlessEngineCommandWrapperEffect';
import { useEnterLayoutCustomizationMode } from '@/layout-customization/hooks/useEnterLayoutCustomizationMode';
import { useResetLocationHash } from 'aegis-ui/utilities';

export const EditRecordPageLayoutSingleRecordCommand = () => {
  const { enterLayoutCustomizationMode } = useEnterLayoutCustomizationMode();

  const { resetLocationHash } = useResetLocationHash();

  const handleExecute = () => {
    enterLayoutCustomizationMode();
    resetLocationHash();
  };

  return <HeadlessEngineCommandWrapperEffect execute={handleExecute} />;
};
