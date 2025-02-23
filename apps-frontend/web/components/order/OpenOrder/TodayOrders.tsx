import storeOrders from '@fishprovider/cross/dist/stores/orders';
import { OrderStatus } from '@fishprovider/utils/dist/constants/order';
import { getProfit } from '@fishprovider/utils/dist/helpers/order';
import type { Order } from '@fishprovider/utils/dist/types/Order.model';
import _ from 'lodash';
import moment from 'moment';

import { watchUserInfoController } from '~controllers/user.controller';
import Group from '~ui/core/Group';
import Icon from '~ui/core/Icon';

function TodayOrders() {
  const {
    providerId,
    asset = 'USD',
  } = watchUserInfoController((state) => ({
    providerId: state.activeAccount?._id,
    asset: state.activeAccount?.asset,
  }));
  const startOfDay = moment.utc().startOf('d');
  const todayOrders = storeOrders.useStore((state) => (
    _.filter(state, (order) => order.providerId === providerId
      && order.status === OrderStatus.closed
      && moment(order.createdAt) >= startOfDay)
  ));

  const sortedTodayOrders = _.sortBy(todayOrders, 'updatedAt');

  if (!sortedTodayOrders.length) return null;

  const renderOrder = (order: Order) => {
    const profit = _.round(getProfit([order], {}, asset), 2);
    return (
      <Icon
        key={order._id}
        name="BatteryFull"
        color={profit >= 0 ? 'green' : 'red'}
        tooltip={`${order.symbol} ${profit} (${moment(order.updatedAt).fromNow()})`}
      />
    );
  };

  return (
    <Group spacing={0}>
      {sortedTodayOrders.map(renderOrder)}
    </Group>
  );
}

export default TodayOrders;
