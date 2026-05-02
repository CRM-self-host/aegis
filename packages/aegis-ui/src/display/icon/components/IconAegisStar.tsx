import { useContext } from 'react';

import IconAegisStarRaw from '@assets/icons/aegis-star.svg?react';
import { type IconComponentProps } from '@ui/display/icon/types/IconComponent';
import { ThemeContext } from '@ui/theme-constants';

type IconAegisStarProps = Pick<IconComponentProps, 'size' | 'stroke'>;

export const IconAegisStar = (props: IconAegisStarProps) => {
  const { theme } = useContext(ThemeContext);
  const size = props.size ?? 24;
  const stroke = props.stroke ?? theme.icon.stroke.md;

  return <IconAegisStarRaw height={size} width={size} strokeWidth={stroke} />;
};
