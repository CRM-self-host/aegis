import { type EyebrowType } from '@/design-system/components/Eyebrow';
import { type HeadingType } from '@/design-system/components/Heading';
import { type ProblemPointType } from './ProblemPoint';

export type ProblemDataType = {
  eyebrow: EyebrowType;
  heading: HeadingType[];
  points: ProblemPointType[];
};
