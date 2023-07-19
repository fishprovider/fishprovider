import type { GetNewsUseCase } from '@fishprovider/application-rules';
import type { News } from '@fishprovider/enterprise-rules';
import { z } from 'zod';

import { requireLogIn } from '~helpers';
import type { ApiHandler, ApiHandlerParams } from '~types';

export const getNewsController = (
  getNewsUseCase: GetNewsUseCase,
): ApiHandler<News[]> => async (
  { userSession, data }: ApiHandlerParams,
) => {
  requireLogIn(userSession);

  const payload = z.object({
    today: z.boolean().optional(),
    week: z.string().optional(),
    upcoming: z.boolean().optional(),
  }).refine((item) => item.today || item.week || item.upcoming)
    .parse(data);

  const news = await getNewsUseCase({ payload });
  return news;
};
