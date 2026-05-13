import { COLOR_DARK } from '@ui/theme/constants/ColorsDark';
import { FONT_COMMON } from './FontCommon';
import { GRAY_SCALE_DARK } from './GrayScaleDark';

export const FONT_DARK = {
  color: {
    primary: GRAY_SCALE_DARK.gray12,   // #F5F5F5 light text
    secondary: GRAY_SCALE_DARK.gray11, // #9CA3AF muted
    tertiary: GRAY_SCALE_DARK.gray9,    // #818181
    light: GRAY_SCALE_DARK.gray8,
    extraLight: GRAY_SCALE_DARK.gray7,
    inverted: GRAY_SCALE_DARK.gray1,     // brand-dark-bg #0D1117
    danger: COLOR_DARK.red,
  },
  ...FONT_COMMON,
};