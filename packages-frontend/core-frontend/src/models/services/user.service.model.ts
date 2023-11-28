import {
  User,
} from '@fishprovider/core';

import {
  BaseGetResult, UserInfo, UserRepository,
} from '..';

export type GetUserService = (params: {
  filter: {
    email?: string,
  },
  repositories: {
    user: UserRepository
  },
}) => Promise<BaseGetResult<User>>;

export type UpdateUserService = (params: {
  filter: {
    email?: string,
  },
  payload: {
    name?: string,
    starAccount?: {
      accountId: string,
      enabled: boolean,
    },
  },
  repositories: {
    user: UserRepository
  },
}) => Promise<BaseGetResult<User>>;

export type RefreshUserRolesService = (params: {
  filter: {
    email?: string,
  },
  repositories: {
    user: UserRepository
  },
}) => Promise<BaseGetResult<User>>;

export type WatchUserService = <T>(params: {
  selector: (state: Record<string, User>) => T,
  repositories: {
    user: UserRepository,
  },
}) => T;

//
// UserInfo
//

export type WatchUserInfoService = <T>(params: {
  selector: (state: Record<string, UserInfo>) => T,
  repositories: {
    user: UserRepository,
  },
}) => T;

export type GetUserInfoService = (params: {
  repositories: {
    user: UserRepository,
  },
}) => UserInfo;

export type UpdateUserInfoService = (params: {
  payload: Partial<UserInfo>,
  repositories: {
    user: UserRepository,
  },
}) => void;
