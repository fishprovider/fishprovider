import {
  Account, AccountConfig, AccountMember, AccountViewType,
} from '@fishprovider/core';

import {
  BaseGetManyResult, BaseGetOptions, BaseGetResult, BaseUpdateOptions, BaseUpdateResult,
} from '..';

export interface GetAccountFilter {
  accountId?: string,
  accountIds?: string[],
  accountViewType?: AccountViewType,
  memberId?: string,
  email?: string,
  config?: AccountConfig,
}

export interface UpdateAccountPayload {
  name?: string,
  addMember?: AccountMember,
  removeMemberId?: string,
  removeMemberInviteEmail?: string,
}

export interface AccountRepository {
  getAccount?: (
    filter: GetAccountFilter,
    options: BaseGetOptions<Account>,
  ) => Promise<BaseGetResult<Account>>;

  getAccounts?: (
    filter: GetAccountFilter,
    options: BaseGetOptions<Account>,
  ) => Promise<BaseGetManyResult<Account>>;

  updateAccount?: (
    filter: GetAccountFilter,
    payload: UpdateAccountPayload,
    options: BaseUpdateOptions<Account>,
  ) => Promise<BaseUpdateResult<Account>>;
}
