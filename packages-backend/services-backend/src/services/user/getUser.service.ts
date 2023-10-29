import { BaseError, GetUserService, UserError } from '@fishprovider/core';

import {
  checkLogin, checkProjection, checkRepository, sanitizeOutputUser,
} from '../..';

export const getUserService: GetUserService = async ({
  filter, options, repositories, context,
}) => {
  //
  // pre-check
  //
  checkLogin(context?.userSession);
  const getUserRepo = checkRepository(repositories.user.getUser);

  //
  // main
  //
  const { doc: user } = await getUserRepo(filter, options);
  if (!user) {
    throw new BaseError(UserError.USER_NOT_FOUND);
  }

  checkProjection(options?.projection, user);

  return {
    doc: sanitizeOutputUser(user),
  };
};
