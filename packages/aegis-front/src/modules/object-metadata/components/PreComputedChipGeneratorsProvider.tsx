import React, { useMemo } from 'react';

import { allowRequestsToAegisIconsState } from '@/client-config/states/allowRequestsToAegisIcons';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { PreComputedChipGeneratorsContext } from '@/object-metadata/contexts/PreComputedChipGeneratorsContext';
import { objectMetadataItemsSelector } from '@/object-metadata/states/objectMetadataItemsSelector';
import { getRecordChipGenerators } from '@/object-record/utils/getRecordChipGenerators';

export const PreComputedChipGeneratorsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const objectMetadataItems = useAtomStateValue(objectMetadataItemsSelector);
  const allowRequestsToAegisIcons = useAtomStateValue(
    allowRequestsToAegisIconsState,
  );
  const { chipGeneratorPerObjectPerField, identifierChipGeneratorPerObject } =
    useMemo(() => {
      return getRecordChipGenerators(
        objectMetadataItems,
        allowRequestsToAegisIcons,
      );
    }, [allowRequestsToAegisIcons, objectMetadataItems]);

  return (
    <>
      <PreComputedChipGeneratorsContext.Provider
        value={{
          chipGeneratorPerObjectPerField,
          identifierChipGeneratorPerObject,
        }}
      >
        {children}
      </PreComputedChipGeneratorsContext.Provider>
    </>
  );
};
