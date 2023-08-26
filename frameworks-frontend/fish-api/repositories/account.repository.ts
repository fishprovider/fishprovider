import { type AccountRepository, DefaultAccountRepository, type GetAccountRepositoryParams } from '@fishprovider/application';
import type { Account } from '@fishprovider/models';

// import { StoreAccountRepository } from '@fishprovider/framework-store';
import { fishApi } from '../fishApi.framework';

const getAccount = async (params: GetAccountRepositoryParams) => {
  const { apiGet } = await fishApi.get();
  const account = await apiGet<Account>('/account/getAccount', params);
  // StoreAccountRepository.setAccount({ account });
  return account;
};

export const FishApiAccountRepository: AccountRepository = {
  ...DefaultAccountRepository,
  getAccount,
};
