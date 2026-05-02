import { z } from 'zod';

import { CurrencyCode } from 'aegis-shared/constants';

export const currencyCodeSchema = z.enum(CurrencyCode);
