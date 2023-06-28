import { destroyAsync, start } from '@fishbot/core/libs/mongo';
import type { Account } from '@fishbot/utils/types/Account.model';

import Connection from '~Connection';
import type { ConnectionType } from '~types/Connection.model';

const env = {
  typeId: process.env.TYPE_ID,
};

const getConfig = async () => {
  const account = await Mongo.collection<Account>('accounts').findOne(
    { _id: env.typeId },
    {
      projection: {
        config: 1,
      },
    },
  );
  if (!account) {
    throw new Error('Account not found');
  }
  return account.config;
};

const createConnection = async (
  onEvent?: (_: any) => void,
  configOverride?: any,
): Promise<ConnectionType> => {
  await start();

  const configRaw = await getConfig();
  const config = {
    ...configRaw,
    ...configOverride,
  };

  const connection = new Connection(
    config,
    onEvent,
  );
  return connection;
};

const destroyConnection = async (connection: ConnectionType) => {
  if (connection) {
    await connection.destroy();
  }
  await destroyAsync();
};

export {
  createConnection, destroyConnection, getConfig,
};
