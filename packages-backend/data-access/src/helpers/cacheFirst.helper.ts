export const getCacheFirst = async <T>(params: {
  getCache?: () => Promise<T>,
  setCache?: (data?: T) => Promise<T>,
  getDb?: () => Promise<T>,
}) => {
  const { getCache, setCache, getDb } = params;

  let data: T | undefined = await getCache?.();

  if (!data) {
    data = await getDb?.();
    setCache?.(data); // non-blocking
  }

  return data;
};

export const updateCacheFirst = async <T>(params: {
  updateDb?: () => Promise<T>,
  updateCache?: (data?: T) => Promise<T>,
}) => {
  const { updateDb, updateCache } = params;

  const data: T | undefined = await updateDb?.();

  updateCache?.(data); // non-blocking

  return data;
};
