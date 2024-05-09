import { Request } from 'express';
import { IUserJwt } from 'shared/types/user';

export interface IRequest extends Request {
  currentUser?: IUserJwt
}
