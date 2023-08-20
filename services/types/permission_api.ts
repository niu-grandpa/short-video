import { IUser } from './user_api';
import { IVideo } from './video_api';

export interface IPUser {
  token: string;
  permissions: IUser['permissions'];
}

export interface IPVideo {
  _id: string;
  uid: string;
  permissions: IVideo['permissions'];
}
