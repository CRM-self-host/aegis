import { type ReactNode } from 'react';
import { type TipTapMark } from 'aegis-shared/utils';

export const strike = (_: TipTapMark, children: ReactNode): ReactNode => {
  return <span style={{ textDecoration: 'line-through' }}>{children}</span>;
};
