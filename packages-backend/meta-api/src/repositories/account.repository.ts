import { AccountConfig, BaseError, RepositoryError } from '@fishprovider/core';
import { AccountRepository } from '@fishprovider/core-backend';

import { Connection, getAccountInformation, newAccount } from '..';

const checkConfig = (config?: AccountConfig) => {
  if (!config) {
    throw new BaseError(RepositoryError.REPOSITORY_BAD_REQUEST, 'Missing config');
  }

  return config;
};

const getAccount: AccountRepository['getAccount'] = async (payload) => {
  const { config: rawConfig, accountId } = payload;
  const config = checkConfig(rawConfig);

  const doc = await getAccountInformation(
    new Connection(config),
    accountId,
  );

  return {
    doc,
  };
};

const addAccount: AccountRepository['addAccount'] = async (payload) => {
  const { config: rawConfig } = payload;
  const config = checkConfig(rawConfig);

  const { id } = await newAccount(
    new Connection(config),
    {
      ...config,
      login: config.user,
      password: config.pass,
    },
  );

  return {
    doc: {
      _id: id,
    },
  };
};

export const MetaApiAccountRepository: AccountRepository = {
  getAccount,
  addAccount,
};
