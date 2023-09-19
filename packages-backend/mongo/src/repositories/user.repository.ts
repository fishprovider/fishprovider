import { AccountRoles, User, UserRoles } from '@fishprovider/core';
import {
  BaseGetOptions, BaseUpdateOptions, UserRepository,
} from '@fishprovider/repositories';
import { Filter, ReturnDocument, UpdateFilter } from 'mongodb';

import { getMongo } from '..';

const roleFields = {
  [AccountRoles.admin]: 'adminProviders',
  [AccountRoles.protector]: 'protectorProviders',
  [AccountRoles.trader]: 'traderProviders',
  [AccountRoles.viewer]: 'viewerProviders',
};

const buildUserFilter = (filter: {
  userId?: string
  email?: string,
  pushNotifType?: string
  pushNotifTopic?: string
}): Filter<User> => {
  const {
    userId, email, pushNotifType, pushNotifTopic,
  } = filter;
  return {
    ...(userId && { _id: userId }),
    ...(email && { email }),
    ...(pushNotifType && {
      pushNotif: {
        $elemMatch: {
          type: pushNotifType,
          topic: pushNotifTopic || 'allDevices',
        },
      },
    }),
  };
};

const getUser = async (
  filter: {
    userId?: string
    email?: string,
  },
  options?: BaseGetOptions<User>,
) => {
  const { db } = await getMongo();
  const user = await db.collection<User>('users').findOne(
    buildUserFilter(filter),
    options,
  );
  return { doc: user ?? undefined };
};

const updateUser = async (
  filter: {
    userId?: string
    email?: string,
  },
  payload: {
    name?: string
    picture?: string
    roles?: UserRoles
    starProvider?: {
      accountId: string
      enabled: boolean
    }
    addRole?: {
      accountId: string
      role: AccountRoles
    },
  },
  options?: BaseUpdateOptions<User>,
) => {
  const userFilter = buildUserFilter(filter);

  const {
    name, picture, starProvider, addRole, roles,
  } = payload;
  const {
    returnAfter, projection,
  } = options || {};

  const updateFilter: UpdateFilter<User> = {
    $set: {
      ...(name && { name }),
      ...(picture && { picture }),
      ...(roles && { roles }),
      ...(starProvider && {
        [`starProviders.${starProvider.accountId}`]: starProvider.enabled,
      }),
      ...(addRole && {
        [`roles.${roleFields[addRole.role]}.${addRole.accountId}`]: true,
      }),
    },
  };

  const { db } = await getMongo();
  const collection = db.collection<User>('users');

  if (returnAfter) {
    const { value: user } = await collection.findOneAndUpdate(
      userFilter,
      updateFilter,
      {
        returnDocument: ReturnDocument.AFTER,
        projection,
      },
    );
    return { doc: user ?? undefined };
  }
  await collection.updateOne(userFilter, updateFilter);
  return {};
};

const getUsers = async (
  filter: {
    pushNotifType?: string
    pushNotifTopic?: string
  },
  options?: BaseGetOptions<User>,
) => {
  const { db } = await getMongo();
  const users = await db.collection<User>('users').find(
    buildUserFilter(filter),
    options,
  ).toArray();
  return { docs: users };
};

export const MongoUserRepository: UserRepository = {
  getUser,
  updateUser,
  getUsers,
};
