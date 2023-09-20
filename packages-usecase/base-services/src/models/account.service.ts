import {
  Account, AccountMember, AccountViewType,
} from '@fishprovider/core';
import {
  AccountRepository, BaseGetManyResult, BaseGetResult, UserRepository,
} from '@fishprovider/repositories';

import { BaseGetServiceParams, BaseUpdateServiceParams } from '..';

export type GetAccountService = (params: BaseGetServiceParams<Account> & {
  filter: {
    accountId: string,
  },
  repositories: {
    account: AccountRepository
  },
}) => Promise<BaseGetResult<Account>>;

export type UpdateAccountService = (params: BaseUpdateServiceParams<Account> & {
  filter: {
    accountId: string,
  },
  payload: {
    name?: string,
    addMember?: AccountMember,
    removeMemberId?: string,
    removeMemberInviteEmail?: string,
    providerPlatformAccountId?: string,
    leverage?: number,
    balance?: number,
    assetId?: string,
    providerData?: any,
    updatedAt?: Date,
  },
  repositories: {
    account: AccountRepository
  },
}) => Promise<BaseGetResult<Account>>;

export type JoinAccountService = (params: BaseUpdateServiceParams<Account> & {
  filter: {
    accountId: string,
    email: string,
  },
  repositories: {
    account: AccountRepository
    user: UserRepository,
  },
}) => Promise<BaseGetResult<Account>>;

export type GetTradeAccountService = (params: BaseUpdateServiceParams<Account> & {
  filter: {
    accountId: string,
  },
  repositories: {
    account: AccountRepository,
    trade: AccountRepository,
  },
}) => Promise<BaseGetResult<Account>>;

export type GetAccountsService = (params: BaseGetServiceParams<Account> & {
  filter: {
    accountIds?: string[],
    accountViewType?: AccountViewType,
    memberId?: string,
    email?: string,
  },
  repositories: {
    account: AccountRepository
  },
}) => Promise<BaseGetManyResult<Account>>;
