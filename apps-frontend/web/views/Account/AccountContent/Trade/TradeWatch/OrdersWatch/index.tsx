import orderGetIdea from '@fishprovider/cross/dist/api/orders/getIdea';
import orderGetMany from '@fishprovider/cross/dist/api/orders/getMany';
import orderGetManyInfo from '@fishprovider/cross/dist/api/orders/getManyInfo';
import { queryKeys } from '@fishprovider/cross/dist/constants/query';
import { useQuery } from '@fishprovider/cross/dist/libs/query';
import storeOrders from '@fishprovider/cross/dist/stores/orders';
import { OrderStatus } from '@fishprovider/utils/dist/constants/order';
import { redisKeys } from '@fishprovider/utils/dist/constants/redis';
import type { Order } from '@fishprovider/utils/dist/types/Order.model';
import { useEffect, useRef } from 'react';

import { activityFields } from '~constants/account';
import { watchUserInfoController } from '~controllers/user.controller';
import { subDoc } from '~libs/sdb';
import { refreshMS } from '~utils';

function useLiveOrdersSocket(providerId: string) {
  const socket = watchUserInfoController((state) => state.socket);

  const prevChannel = useRef<string>();
  useEffect(() => {
    prevChannel.current = redisKeys.liveOrders(providerId);
  });

  useEffect(() => {
    if (socket) {
      if (prevChannel.current) {
        Logger.debug('[socket] unsub from prev', prevChannel.current);
        socket.off(prevChannel.current);
        socket.emit('leave', prevChannel.current);
      }

      const channel = redisKeys.liveOrders(providerId);
      Logger.debug('[socket] sub', channel);
      socket.emit('join', channel);
      socket.on(channel, (docs: Order[]) => {
        storeOrders.mergeDocs(docs);
      });
    } else {
      Logger.debug('Skipped useLiveOrdersSocket', providerId);
    }
    return () => {
      if (socket) {
        const channel = redisKeys.liveOrders(providerId);
        Logger.debug('[socket] unsub', channel);
        socket.off(channel);
        socket.emit('leave', channel);
      }
    };
  }, [socket, providerId]);
}

function useLiveOrdersSdb(providerId: string) {
  const isClientLoggedIn = watchUserInfoController((state) => state.isClientLoggedIn);

  useEffect(() => {
    if (isClientLoggedIn) {
      Logger.debug('[firestore] sub', `liveOrders/${providerId}`);
      const unsub = subDoc<{ orders: Order[] }>({
        doc: `liveOrders/${providerId}`,
        onSnapshot: (doc) => {
          storeOrders.mergeDocs(doc.orders);
        },
      });
      return unsub;
    }
    return () => undefined;
  }, [isClientLoggedIn, providerId]);
}

function usePendingOrdersSocket(providerId: string) {
  const socket = watchUserInfoController((state) => state.socket);

  const prevChannel = useRef<string>();
  useEffect(() => {
    prevChannel.current = redisKeys.pendingOrders(providerId);
  });

  useEffect(() => {
    if (socket) {
      if (prevChannel.current) {
        Logger.debug('[socket] unsub from prev', prevChannel.current);
        socket.off(prevChannel.current);
        socket.emit('leave', prevChannel.current);
      }

      const channel = redisKeys.pendingOrders(providerId);
      Logger.debug('[socket] sub', channel);
      socket.emit('join', channel);
      socket.on(channel, (docs: Order[]) => {
        storeOrders.mergeDocs(docs);
      });
    } else {
      Logger.debug('Skipped usePendingOrdersSocket', providerId);
    }
    return () => {
      if (socket) {
        const channel = redisKeys.pendingOrders(providerId);
        Logger.debug('[socket] unsub', channel);
        socket.off(channel);
        socket.emit('leave', channel);
      }
    };
  }, [socket, providerId]);
}

function usePendingOrdersSdb(providerId: string) {
  const isClientLoggedIn = watchUserInfoController((state) => state.isClientLoggedIn);

  useEffect(() => {
    if (isClientLoggedIn) {
      Logger.debug('[firestore] sub', `pendingOrders/${providerId}`);
      const unsub = subDoc<{ orders: Order[] }>({
        doc: `pendingOrders/${providerId}`,
        onSnapshot: (doc) => {
          storeOrders.mergeDocs(doc.orders);
        },
      });
      return unsub;
    }
    return () => undefined;
  }, [isClientLoggedIn, providerId]);
}

interface OrdersWatchProps {
  accountId: string;
}

function OrdersWatch({ accountId }: OrdersWatchProps) {
  useEffect(() => {
    orderGetMany({ providerId: accountId, reload: true }).then((res) => {
      const orderIds = [...res.orders, ...res.positions].map((item) => item._id);
      if (!orderIds.length) return;
      orderGetManyInfo({ providerId: accountId, orderIds, fields: activityFields });
    });
    orderGetIdea({ providerId: accountId, reload: true });
  }, [accountId]);

  useQuery({
    queryFn: () => orderGetMany({ providerId: accountId, orderStatus: OrderStatus.live }).then((res) => {
      const orderIds = res.positions.map((item) => item._id);
      if (!orderIds.length) return [];
      return orderGetManyInfo({ providerId: accountId, orderIds, fields: activityFields });
    }),
    queryKey: queryKeys.orders(`${accountId}-${OrderStatus.live}`),
    refetchInterval: refreshMS,
  });

  useQuery({
    queryFn: () => orderGetMany({ providerId: accountId, orderStatus: OrderStatus.pending }).then((res) => {
      const orderIds = res.orders.map((item) => item._id);
      if (!orderIds.length) return [];
      return orderGetManyInfo({ providerId: accountId, orderIds, fields: activityFields });
    }),
    queryKey: queryKeys.orders(`${accountId}-${OrderStatus.pending}`),
    refetchInterval: refreshMS,
  });

  useLiveOrdersSocket(accountId);
  useLiveOrdersSdb(accountId);

  usePendingOrdersSocket(accountId);
  usePendingOrdersSdb(accountId);

  return null;
}

export default OrdersWatch;
