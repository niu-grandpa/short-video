import * as e from 'express';
import { Query } from 'express-serve-static-core';

// **** Express **** //

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface IReqQuery<T extends Query, U = void> extends e.Request {
  query: T;
  body: U;
}

export interface IRes extends e.Response {}

export interface GenericPagination {
  page: number;
  size: number;
  /**正倒序 */
  sort?: 1 | -1;
}
