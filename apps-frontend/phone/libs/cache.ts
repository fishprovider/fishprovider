import AsyncStorage from '@react-native-async-storage/async-storage';

import { getUserInfoController, updateUserInfoController } from '~controllers/user.controller';

async function cacheRead<T>(key: string) {
  try {
    const val = await AsyncStorage.getItem(key);
    return val ? JSON.parse(val) as T : null;
  } catch (err) {
    Logger.error('[cacheRead] Error', err);
    return null;
  }
}

async function cacheWrite<T>(key: string, value: T) {
  try {
    AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    Logger.error('[cacheWrite] Error', err);
  }
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
