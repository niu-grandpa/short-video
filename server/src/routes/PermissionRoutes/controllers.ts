import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IPUser, IPVideo } from '@src/models/Permission';
import PermissionService from '@src/services/PermissionService';
import { IReq, IRes } from '../types/types';

/**
 * 用户个人权限设置
 */
async function setUser(req: IReq<{ data: IPUser }>, res: IRes) {
  await PermissionService.setUser(req.body.data);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * 视频权限设置
 */
async function setVideo(req: IReq<{ data: IPVideo }>, res: IRes) {
  await PermissionService.setVideo(req.body.data);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  setUser,
  setVideo,
} as const;
