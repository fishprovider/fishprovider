import {
  Account, AccountActivity, AccountBannerStatus, AccountConfig, AccountPlatform,
  AccountProtectSettings, AccountSettings, AccountTradeSettings, AccountTradeType,
  AccountViewType, checkRepository, ProviderType,
} from '@fishprovider/core';
import storeAccounts from '@fishprovider/cross/dist/stores/accounts';
import { StoreFirstAccountRepository } from '@fishprovider/store-first';
import { Account as AccountOld } from '@fishprovider/utils/types/Account.model';

const repo = StoreFirstAccountRepository;

export const getAccountController = async (filter: {
  accountId: string,
  getTradeInfo?: boolean,
}) => {
  const getAccountRepo = checkRepository(repo.getAccount);
  const { doc: account } = await getAccountRepo(filter);
  if (account) { // TODO: remove
    storeAccounts.mergeDoc(account as Partial<AccountOld>);
  }
  return account;
};

export const getAccountsController = async (filter: {
  viewType?: AccountViewType,
  email?: string,
}) => {
  const getAccountsRepo = checkRepository(repo.getAccounts);
  const { docs: accounts } = await getAccountsRepo(filter);
  if (accounts) { // TODO: remove
    storeAccounts.mergeDocs(accounts as Partial<AccountOld>[]);
  }
  return accounts;
};

export const getTradeAccountsController = async (filter: {
  platform: AccountPlatform,
  baseConfig: Partial<AccountConfig>,
  tradeRequest: {
    redirectUrl: string,
    code: string,
  },
}) => {
  const getTradeAccountsRepo = checkRepository(repo.getAccounts);
  const { docs: tradeAccounts } = await getTradeAccountsRepo({
    getTradeAccounts: filter,
  });
  return tradeAccounts;
};

export const updateAccountController = async (
  filter: {
    accountId: string,
  },
  payload: {
    viewType?: AccountViewType,
    name?: string,
    icon?: string,
    strategyId?: string,
    notes?: string,
    privateNotes?: string,
    bannerStatus?: AccountBannerStatus,
    tradeSettings?: AccountTradeSettings;
    protectSettings?: AccountProtectSettings;
    settings?: AccountSettings;
    addActivity?: AccountActivity,
  },
) => {
  const updateAccountRepo = checkRepository(repo.updateAccount);
  const { doc: account } = await updateAccountRepo(filter, payload);
  if (account) { // TODO: remove
    storeAccounts.mergeDoc(account as Partial<AccountOld>);
  }
  return account;
};

export const addAccountController = async (
  payload: {
    name: string,
    providerType: ProviderType,
    platform: AccountPlatform,
    tradeType: AccountTradeType,
    baseConfig: Partial<AccountConfig>,
  },
) => {
  const addAccountRepo = checkRepository(repo.addAccount);
  const { doc: account } = await addAccountRepo(payload);
  if (account) { // TODO: remove
    storeAccounts.mergeDoc(account as Partial<AccountOld>);
  }
  return account;
};

export const removeAccountController = async (filter: {
  accountId: string,
}) => {
  const removeAccountRepo = checkRepository(repo.removeAccount);
  const { doc: account } = await removeAccountRepo(filter);
  storeAccounts.removeDoc(filter.accountId); // TODO: remove
  return account;
};

export const watchAccountController = <T>(
  selector: (state: Record<string, Account>) => T,
) => {
  const watchAccountRepo = checkRepository(repo.watchAccount);
  return watchAccountRepo(selector);
};
