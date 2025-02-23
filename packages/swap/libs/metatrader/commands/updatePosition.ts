import updatePositionMetaTrader from '@fishprovider/metatrader/dist/commands/updatePosition';
import type { Config as ConfigMetaTrader } from '@fishprovider/metatrader/dist/types/Config.model';
import { send } from '@fishprovider/old-core/dist/libs/notif';
import type { Config } from '@fishprovider/utils/dist/types/Account.model';
import type { Order } from '@fishprovider/utils/dist/types/Order.model';
import _ from 'lodash';

import connectAndRun from '../connectAndRun';

const transformResult = (
  res: any,
) => ({
  order: res,
  position: res,
  providerData: res,
});

const updatePosition = async (params: {
  config: Config,
  requestOrder: Order,
  stopLoss?: number,
  takeProfit?: number,
}) => {
  const {
    config, requestOrder,
    stopLoss = requestOrder.stopLoss,
    takeProfit = requestOrder.takeProfit,
  } = params;
  const {
    providerId, positionId, userName,
  } = requestOrder;

  if (!positionId) {
    throw new Error('Missing positionId');
  }

  const orderToUpdate = {
    stopLoss: stopLoss || undefined,
    takeProfit: takeProfit || undefined,
  };

  const result = await connectAndRun({
    providerId,
    handler: async (conn) => {
      const res = await updatePositionMetaTrader(conn, positionId, orderToUpdate);
      return {
        ..._.omit(requestOrder, ['providerData', 'updatedLogs']),
        ...orderToUpdate,
        ...res,
      };
    },
    config: config as ConfigMetaTrader,
  });

  const transformedResult = transformResult(result);

  const { order, position } = transformedResult;
  const msg = `Updated ${positionId}: ${position.direction} ${position.volume} ${position.symbol} at ${position.price} SL ${position.stopLoss} TP ${position.takeProfit} by ${userName}`;
  Logger.debug(`[${providerId}]`, msg);
  Logger.debug('order', JSON.stringify(order));
  Logger.debug('position', JSON.stringify(position));
  send(msg, [], `p-${providerId}`);

  return transformedResult;
};

export default updatePosition;
