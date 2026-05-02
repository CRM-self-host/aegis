import { type BodyType } from '@/design-system/components/Body';
import { type EyebrowType } from '@/design-system/components/Eyebrow';
import { type HeadingType } from '@/design-system/components/Heading';

export type EditorialDataType = {
  eyebrow?: EyebrowType;
  heading?: HeadingType | HeadingType[];
  body: BodyType | BodyType[];
};
