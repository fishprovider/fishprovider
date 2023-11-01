export type Projection<T> = Partial<Record<keyof T | string, 0 | 1>>;
export type Sort = { [key: string]: 'asc' | 'desc' };

export interface BaseGetOptions<T> {
  projection?: Projection<T>,
  sort?: Sort,
}

export interface BaseUpdateOptions<T> extends BaseGetOptions<T> {
  returnAfter?: boolean,
}

export interface BaseGetResult<T> {
  doc?: Partial<T>;
}

export interface BaseUpdateResult<T> extends BaseGetResult<T> {
  matchedCount?: number;
  modifiedCount?: number;
}

export interface BaseGetManyResult<T> {
  docs?: Partial<T>[];
}
