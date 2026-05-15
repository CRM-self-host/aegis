import { z } from 'zod';

import { CurrencyCode } from 'aegis-shared/branding-constants';

export const currencyCodeSchema = z.enum(CurrencyCode);
