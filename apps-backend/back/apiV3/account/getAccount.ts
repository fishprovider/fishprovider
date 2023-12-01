import { CacheFirstAccountRepository } from '@fishprovider/cache-first';
import { Account } from '@fishprovider/core';
import { getAccountService } from '@fishprovider/core-backend';
import { z } from 'zod';

import { ApiHandler } from '~types/ApiHandler.model';

const getAccount: ApiHandler<Partial<Account>> = async (data, userSession) => {
  const input = z.object({
    filter: z.object({
      accountId: z.string(),
    }).strict(),
  }).strict()
    .parse(data);

  const { filter } = input;

  const { doc } = await getAccountService({
    filter,
    repositories: {
      account: CacheFirstAccountRepository,
    },
    options: {
      initializeCache: true,
    },
    context: { userSession },
  });

  return { result: doc };
};

export default getAccount;
