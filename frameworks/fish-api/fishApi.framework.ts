import { promiseCreator } from '@fishprovider/application-rules';
import assert from 'assert';
import axios, { Axios, AxiosRequestConfig } from 'axios';

export type ApiConfig = AxiosRequestConfig;

let client: Axios | undefined;
const clientPromise = promiseCreator();

let logDebug = console.log;
let logError = console.error;

const start = async (params: {
  baseURL?: string,
  logDebug?: (...args: any[]) => void
  logError?: (...args: any[]) => void
}) => {
  client = axios.create({
    ...(params.baseURL && {
      baseURL: params.baseURL,
    }),
    withCredentials: true,
  });
  console.info('Started fishApi.framework');
  clientPromise.resolveExec();

  if (params.logDebug) {
    logDebug = params.logDebug;
  }
  if (params.logError) {
    logError = params.logError;
  }

  return client;
};

const stop = async () => {
  console.info('Stopped fishApi.framework');
};

const checkSkipLog = (url: string) => url === '/logger';

async function errHandler<T>(
  handler: () => Promise<T>,
  url: string,
  payload: Record<string, any> = {},
  options?: ApiConfig,
) {
  try {
    return await handler();
  } catch (err: any) {
    const errMsg = err.response?.data || err.message || err;
    if (!checkSkipLog(url)) {
      logDebug(err, url, payload, options);
      if (axios.isCancel(err)) {
        logDebug(`API Cancelled: ${url}`);
      } else {
        logError(`API Error: ${url}, ${errMsg}`);
      }
    }
    throw new Error(errMsg);
  }
}

async function apiGet<T>(
  url: string,
  payload: Record<string, any> = {},
  options?: ApiConfig,
) {
  return errHandler<T>(async () => {
    assert(client);
    const res = await client.get<T>(url, {
      ...options,
      params: payload,
    });
    return res.data;
  }, url, payload, options);
}

async function apiPost<T>(
  url: string,
  payload: Record<string, any> = {},
  options?: ApiConfig,
) {
  return errHandler<T>(async () => {
    assert(client);
    const res = await client.post<T>(url, payload, options);
    return res.data;
  }, url, payload, options);
}

const get = async () => {
  await clientPromise;
  assert(client);
  return {
    apiGet,
    apiPost,
  };
};

export const fishApi = {
  start,
  stop,
  get,
};
