import { BaseError } from '@fishprovider/core';

import { RepositoryError } from '..';

export const checkRepository = <T>(repoFunction?: T) => {
  if (!repoFunction) {
    throw new BaseError(RepositoryError.REPOSITORY_NOT_IMPLEMENT);
  }
  return repoFunction;
};
