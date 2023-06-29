import type { ConnectionType } from '@fishbot/metatrader/types/Connection.model';
import type { CallbackPayload } from '@fishbot/metatrader/types/Event.model';
import fetchAccountInfo from '@fishbot/swap/commands/fetchAccountInfo';
import fetchDeals from '@fishbot/swap/commands/fetchDeals';
import fetchOrders from '@fishbot/swap/commands/fetchOrders';
import random from '@fishbot/utils/helpers/random';
import type { Order } from '@fishbot/utils/types/Order.model';
import _ from 'lodash';

import type { ClientAccount } from '~types/Client.model';

const env = {
  nodeEnv: process.env.NODE_ENV,
  typePre: process.env.TYPE_PRE,
};

const checkRequestOrder = async (providerId: string, order: any) => {
  const newId = random();
  const orderId = order?.orderId || `event-${newId}`;
  const positionId = order?.positionId || `event-${newId}`;
  const comment = order?.comment || `event-create-${newId}`;

  const requestOrder = await Mongo.collection<Order>('orders').findOne({
    providerId,
    $or: [
      { orderId },
      { positionId },
      { comment },
    ],
  }, {
    projection: {
      updatedLogs: 0,
      providerData: 0,
    },
  });
  if (requestOrder) {
    return {
      requestOrder: {
        ...requestOrder,
        orderId,
        positionId,
        comment,
      },
      orderId,
      positionId,
      comment,
    };
  }
  Logger.warn('[checkRequestOrder] requestOrder not found', orderId, positionId);
  return {
    orderId, positionId, comment,
  };
};

const updateRequestOrder = async (
  requestOrder: Order,
  order: Order,
  providerData?: any,
) => {
  const updateDoc = {
    ...order,
    providerData: _.omit(providerData, ['symbolIds', 'prices']),
    updatedAt: new Date(),
  };
  Logger.debug(`Updating requestOrder ${requestOrder._id}`);
  await Mongo.collection<Order>('orders').updateOne(
    { _id: requestOrder._id },
    {
      $set: updateDoc,
      $push: {
        updatedLogs: updateDoc,
      },
    },
  );
  return updateDoc;
};

const reloadOrdersAndAccount = async (
  payload: CallbackPayload,
  account: ClientAccount,
  connection: ConnectionType,
) => {
  const { accountId } = payload;
  const {
    _id: providerId, providerType, providerPlatform,
  } = account;

  await fetchOrders({
    providerId,
    providerType,
    providerPlatform,
    options: {
      connection,
      accountId,
    },
  });
  await fetchDeals({
    providerId,
    providerType,
    providerPlatform,
    options: {
      connection,
      accountId,
      days: 1,
    },
  });
  await fetchAccountInfo({
    providerId,
    providerType,
    providerPlatform,
    options: {
      connection,
      accountId,
    },
  });

  const botId = env.nodeEnv === 'production' ? 'bot' : 'bot-dev';
  const copyId = env.nodeEnv === 'production' ? 'copy' : 'copy-dev';

  Agenda.now(`${env.typePre}-${botId}-bots-manual`, { source: 'event' });
  Agenda.now(`${env.typePre}-${copyId}-copiers-manual`, { source: 'event' });
};

export {
  checkRequestOrder,
  reloadOrdersAndAccount,
  updateRequestOrder,
};
