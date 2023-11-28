import { CacheFirstAccountRepository } from '@fishprovider/cache-first';
import { Account, AccountPlatform } from '@fishprovider/core';
import { getTradeAccountsService } from '@fishprovider/core-backend';
import { TradeAccountRepository } from '@fishprovider/trade';
import { z } from 'zod';

import { ApiHandler } from '~types/ApiHandler.model';

const handler: ApiHandler<Partial<Account>[]> = async (data, userSession) => {
  const filter = z.object({
    platform: z.nativeEnum(AccountPlatform),
    baseConfig: z.object({
      clientId: z.string(),
    }).strict(),
    tradeRequest: z.object({
      redirectUrl: z.string(),
      code: z.string(),
    }).strict().optional(),
  }).strict()
    .parse(data);

  const { platform, baseConfig, tradeRequest } = filter;

  const { docs } = await getTradeAccountsService({
    filter: {
      platform,
      baseConfig,
      tradeRequest,
    },
    repositories: {
      account: CacheFirstAccountRepository,
      trade: TradeAccountRepository,
    },
    context: { userSession },
  });
  return { result: docs };
};

export default handler;
