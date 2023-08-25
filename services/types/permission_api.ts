import { IVideo } from './video_api';

export interface IPVideo {
  vid: string;
  uid: string;
  permissions: IVideo['permissions'];
}
