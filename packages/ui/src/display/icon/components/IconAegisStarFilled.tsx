import { useContext } from 'react';

import IconAegisStarFilledRaw from '@assets/icons/aegis-star-filled.svg?react';
import { type IconComponentProps } from '@ui/display/icon/types/IconComponent';
import { ThemeContext } from '@ui/theme-constants';

type IconAegisStarFilledProps = Pick<IconComponentProps, 'size' | 'stroke'>;

export const IconAegisStarFilled = (props: IconAegisStarFilledProps) => {
  const { theme } = useContext(ThemeContext);
  const size = props.size ?? 24;
  const stroke = props.stroke ?? theme.icon.stroke.md;

  return (
    <IconAegisStarFilledRaw height={size} width={size} strokeWidth={stroke} />
  );
};
