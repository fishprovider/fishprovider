import { ErrorType } from '@fishprovider/utils/dist/constants/error';
import type { User } from '@fishprovider/utils/dist/types/User.model';
import { jest } from '@jest/globals';

import { afterAllSetup, beforeAllSetup } from '~/tests/utils';

import accountGetManyUser from './getManyUser';

beforeAll((done) => {
  beforeAllSetup(done);
});

afterAll((done) => {
  afterAllSetup(done);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('accountGetManyUser', () => {
  test('accessDenied', async () => {
    const { error } = await accountGetManyUser({
      userInfo: {} as User,
    });
    expect(error).toEqual(ErrorType.accessDenied);
  });

  test('user', async () => {
    const { error, result } = await accountGetManyUser({
      userInfo: {
        uid: 'test',
      } as User,
    });
    expect(error).toBeUndefined();
    expect(result).toBeDefined();
    expect(result?.length).toBeGreaterThan(0);
  });
});
