import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IFavorites, IFollowing } from '@src/models/Action';
import ActionService from '@src/services/ActionService';
import { IReq, IRes } from '../types/types';

/**
 * 关注某人
 */
async function following(req: IReq<IFollowing>, res: IRes) {
  await ActionService.setFollowing(req.body);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * 收藏视频
 */
async function favorites(req: IReq<IFavorites>, res: IRes) {
  await ActionService.setFavorites(req.body);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * 点赞视频
 */
async function likeVideo(req: IReq<IFavorites>, res: IRes) {
  await ActionService.setLikeVideo(req.body);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * 视频已看过
 */
async function videoWatched(req: IReq<{ _id: string }>, res: IRes) {
  await ActionService.addVideoWatched(req.body._id);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  following,
  favorites,
  likeVideo,
  videoWatched,
} as const;
