import { AccountRoles, User } from '@fishprovider/core';
import {
  UserRepository,
} from '@fishprovider/core-backend';
import { Filter, ReturnDocument, UpdateFilter } from 'mongodb';

import { getMongo } from '..';

const buildUserFilter = (filter: {
  email?: string,
  pushNotifType?: string
  pushNotifTopic?: string
}): Filter<User> => {
  const {
    email, pushNotifType, pushNotifTopic,
  } = filter;
  return {
    ...(email && { email }),
    ...(pushNotifType && {
      pushNotif: {
        $elemMatch: {
          type: pushNotifType,
          topic: pushNotifTopic,
        },
      },
    }),
  };
};

const getUser: UserRepository['getUser'] = async (filter, options) => {
  const { db } = await getMongo();
  const user = await db.collection<User>('users').findOne(
    buildUserFilter(filter),
    options,
  );
  return { doc: user ?? undefined };
};

const getUsers: UserRepository['getUsers'] = async (filter, options) => {
  const { db } = await getMongo();
  const users = await db.collection<User>('users').find(
    buildUserFilter(filter),
    options,
  ).toArray();
  return { docs: users };
};

const updateUser: UserRepository['updateUser'] = async (filter, payload, options) => {
  const userFilter = buildUserFilter(filter);

  const {
    starAccount, roles, addRole, removeRole,
  } = payload;
  const {
    returnAfter, projection,
  } = options || {};

  const updateFilter: UpdateFilter<User> = {
    $set: {
      ...(starAccount && {
        [`starAccounts.${starAccount.accountId}`]: starAccount.enabled,
      }),
      ...(roles && { roles }),

      ...(addRole?.role === AccountRoles.admin && {
        [`roles.adminAccounts.${addRole.accountId}`]: true,
      }),
      ...(addRole?.role === AccountRoles.protector && {
        [`roles.protectorAccounts.${addRole.accountId}`]: true,
      }),
      ...(addRole?.role === AccountRoles.trader && {
        [`roles.traderAccounts.${addRole.accountId}`]: true,
      }),
      ...(addRole?.role === AccountRoles.viewer && {
        [`roles.viewerAccounts.${addRole.accountId}`]: true,
      }),

      ...(removeRole?.role === AccountRoles.admin && {
        [`roles.adminAccounts.${removeRole.accountId}`]: false,
      }),
      ...(removeRole?.role === AccountRoles.protector && {
        [`roles.protectorAccounts.${removeRole.accountId}`]: false,
      }),
      ...(removeRole?.role === AccountRoles.trader && {
        [`roles.traderAccounts.${removeRole.accountId}`]: false,
      }),
      ...(removeRole?.role === AccountRoles.viewer && {
        [`roles.viewerAccounts.${removeRole.accountId}`]: false,
      }),
    },
  };

  const { db } = await getMongo();
  const collection = db.collection<User>('users');

  if (returnAfter) {
    const user = await collection.findOneAndUpdate(
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

export const MongoUserRepository: UserRepository = {
  getUser,
  getUsers,
  updateUser,
};
