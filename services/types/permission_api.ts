import { IVideo } from './video_api';

export interface IPVideo {
  _id: string;
  uid: string;
  permissions: IVideo['permissions'];
}
