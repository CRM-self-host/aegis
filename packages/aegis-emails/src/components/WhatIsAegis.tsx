import { type I18n } from '@lingui/core';
import { MainText } from 'src/components/MainText';
import { SubTitle } from 'src/components/SubTitle';

type WhatIsAegisProps = {
  i18n: I18n;
};

export const WhatIsAegis = ({ i18n }: WhatIsAegisProps) => {
  return (
    <>
      <SubTitle value={i18n._('What is Aegis?')} />
      <MainText>
        {i18n._(
          "It's a CRM, a software to help businesses manage their customer data and relationships efficiently.",
        )}
      </MainText>
    </>
  );
};
