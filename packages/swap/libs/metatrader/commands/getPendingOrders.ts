import getOrders from '@fishprovider/metatrader/dist/commands/getOrders';
import type { Config as ConfigMetaTrader } from '@fishprovider/metatrader/dist/types/Config.model';
import type { ConnectionType } from '@fishprovider/metatrader/dist/types/Connection.model';
import type { ProviderType } from '@fishprovider/utils/dist/constants/account';
import type { Config } from '@fishprovider/utils/dist/types/Account.model';
import type { RedisSymbol } from '@fishprovider/utils/dist/types/Redis.model';
import type { AsyncReturnType } from 'type-fest';

import { getSymbols } from '~utils/price';

import connectAndRun from '../connectAndRun';
import { transformOrder } from '../transform';

const transformOrders = (
  res: AsyncReturnType<typeof getOrders>,
  providerId: string,
  providerType: ProviderType,
  symbolIds: Record<string, RedisSymbol>,
) => ({
  orders: res.map((item) => transformOrder(item, providerId, providerType, symbolIds)),
  providerData: res,
});

const getPendingOrders = async (params: {
  providerId: string,
  providerType: ProviderType,
  config?: Config,
  connection?: ConnectionType,
  accountId?: string,
}) => {
  const {
    providerId, providerType, config, connection, accountId,
  } = params;

  const { symbolIds } = await getSymbols(providerType);

  if (connection) {
    const result = await getOrders(connection, accountId);
    return transformOrders(result, providerId, providerType, symbolIds);
  }

  if (!config) {
    throw new Error('config not round');
  }

  const result = await connectAndRun({
    providerId,
    handler: async (conn) => {
      const res = await getOrders(conn);
      return res;
    },
    config: config as ConfigMetaTrader,
  });
  return transformOrders(result, providerId, providerType, symbolIds);
};

export default getPendingOrders;
