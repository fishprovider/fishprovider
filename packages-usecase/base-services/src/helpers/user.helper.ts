import { User, UserRoles } from '@fishprovider/core';
import { BaseGetOptions, GetUserFilter } from '@fishprovider/repositories';

import { sanitizeBaseGetOptions, UserSession } from '..';

export const getRoleProvider = (
  roles?: UserRoles,
  providerId?: string,
) => {
  if (!roles) return {};

  const isAdmin = roles.admin;
  const isAdminWeb = isAdmin || roles.adminWeb;
  const isManagerWeb = isAdminWeb || roles.managerWeb;

  const isAdminProvider = isAdminWeb
    || (providerId && roles.adminProviders?.[providerId]);
  const isTraderProvider = isAdminProvider
    || (providerId && roles.traderProviders?.[providerId]);
  const isProtectorProvider = isAdminProvider
    || (providerId && roles.protectorProviders?.[providerId]);
  const isViewerProvider = isManagerWeb
    || isTraderProvider
    || isProtectorProvider
    || (providerId && roles.viewerProviders?.[providerId]);

  return {
    isAdmin,
    isAdminWeb,
    isManagerWeb,

    isAdminProvider,
    isTraderProvider,
    isProtectorProvider,
    isViewerProvider,
  };
};

export const sanitizeGetUserFilter = (
  filter: GetUserFilter,
  userSession: UserSession,
) => ({
  ...filter,
  userId: userSession._id,
  email: userSession.email,
});

export const sanitizeUserBaseGetOptions = (
  options: BaseGetOptions<User>,
) => sanitizeBaseGetOptions(
  options,
  {
    pushNotif: 0,
  },
);
