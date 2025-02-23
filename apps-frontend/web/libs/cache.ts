import localforage from 'localforage';

import { getUserInfoController, updateUserInfoController } from '~controllers/user.controller';

function cacheRead<T>(key: string) {
  return localforage.getItem<T>(key);
}

function cacheWrite<T>(key: string, value: T) {
  return localforage.setItem<T>(key, value);
}

function getSessionKey(key: string) {
  return `session-${key}`;
}

async function sessionRead<T>(key: string) {
  const sessionKey = getSessionKey(key);
  const { [sessionKey]: val } = getUserInfoController() as {
    [key: string]: T | undefined;
  };
  if (val) return val;

  const cache = await cacheRead<T>(`fp-${sessionKey}`);
  if (!cache) return null;

  updateUserInfoController({ [sessionKey]: cache });
  return cache;
}

function sessionWrite<T>(key: string, val: T) {
  const sessionKey = getSessionKey(key);
  updateUserInfoController({ [sessionKey]: val });
  cacheWrite(`fp-${sessionKey}`, val);
}

export {
  cacheRead, cacheWrite,
  getSessionKey, sessionRead, sessionWrite,
};
