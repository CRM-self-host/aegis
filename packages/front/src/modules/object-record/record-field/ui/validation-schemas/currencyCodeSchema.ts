import { z } from 'zod';

import { CurrencyCode } from 'shared/branding-constants';

export const currencyCodeSchema = z.enum(CurrencyCode);
