import { IVideo } from './Video';

export interface IPVidoe {
  _id: string;
  token: string;
  permissions: IVideo['permissions'];
}
