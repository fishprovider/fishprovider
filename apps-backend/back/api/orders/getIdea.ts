import { getProvider } from '@fishprovider/swap/dist/utils/account';
import { getLiveOrders } from '@fishprovider/swap/dist/utils/order';
import { ErrorType } from '@fishprovider/utils/dist/constants/error';
import { OrderStatus } from '@fishprovider/utils/dist/constants/order';
import { buildCopyId } from '@fishprovider/utils/dist/helpers/order';
import { getRoleProvider } from '@fishprovider/utils/dist/helpers/user';
import type { Order } from '@fishprovider/utils/dist/types/Order.model';
import type { User } from '@fishprovider/utils/dist/types/User.model';
import _ from 'lodash';

const orderGetIdea = async ({ data, userInfo }: {
  data: {
    providerId: string,
  },
  userInfo: User,
}) => {
  const { providerId } = data;
  if (!providerId) {
    return { error: ErrorType.badRequest };
  }

  const { isViewerAccount } = getRoleProvider(userInfo.roles, providerId);
  if (!isViewerAccount) {
    return { error: ErrorType.accessDenied };
  }

  const account = await getProvider(providerId);
  if (!account) {
    return { error: ErrorType.accountNotFound };
  }

  const getIdeas = () => Mongo.collection<Order>('orders').find({
    providerId,
    status: OrderStatus.idea,
  }).toArray();

  const getParentsOrders = async () => {
    const parentOrders = await Promise.all(_.map(
      account.settings?.parents,
      (_1, parentId) => getLiveOrders(parentId).catch((error) => {
        Logger.warn(`Failed to get parent orders ${parentId}`, error);
      }),
    ));
    return _.flatMap(parentOrders, (item) => item || []);
  };

  const [
    ideas,
    parentOrders,
  ] = await Promise.all([
    getIdeas(),
    getParentsOrders(),
  ]);

  const result = [
    ...ideas,
    ...parentOrders.map((order) => ({
      ...order,
      status: OrderStatus.idea,
      providerId,
      copyId: buildCopyId(providerId, order),
    })),
  ];

  return { result };
};

export default orderGetIdea;
