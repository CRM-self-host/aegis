import { type BodyType } from '@/design-system/components/Body';
import { type ThreeCardsBaseDataType } from './ThreeCardsBase';
import { type ThreeCardsIllustrationCardType } from './ThreeCardsIllustrationCard';

export type ThreeCardsIllustrationDataType = ThreeCardsBaseDataType & {
  body: BodyType;
  illustrationCards: ThreeCardsIllustrationCardType[];
};
