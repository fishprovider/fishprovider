import type { GetAccountUseCase } from '@fishprovider/application-rules';
import type { Account } from '@fishprovider/enterprise-rules';
import _ from 'lodash';
import { z } from 'zod';

import type { ApiHandlerRequest, ApiHandlerResponse } from '~types';

export class GetAccountController {
  getAccountUseCase: GetAccountUseCase;

  constructor(
    getAccountUseCase: GetAccountUseCase,
  ) {
    this.getAccountUseCase = getAccountUseCase;
  }

  async run(
    { userSession, data }: ApiHandlerRequest,
  ): ApiHandlerResponse<Partial<Account>> {
    const payload = z.object({
      accountId: z.string().nonempty(),
    }).strict()
      .parse(data);

    const result = await this.getAccountUseCase.run({
      ...payload,
      user: userSession,
    });

    return { result };
  }
}
