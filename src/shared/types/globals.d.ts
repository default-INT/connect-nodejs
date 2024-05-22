import * as core from 'express-serve-static-core';
import { ParamsDictionary } from 'express-serve-static-core';
import { IUserJwt } from 'shared/types/user';

declare module 'express-serve-static-core' {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request
  <
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.ParsedQs,
    LocalsObj extends Record<string, any> = Record<string, any>,
  > extends core.Request <P, ResBody, ReqBody, ReqQuery, LocalsObj> {
    currentUser?: IUserJwt
  }
}
