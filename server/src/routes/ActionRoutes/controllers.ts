import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IFavorites, IFollowing } from '@src/models/Action';
import ActionService from '@src/services/ActionService';
import { IReq, IRes } from '../types/types';

/**
 * 关注某人
 */
async function following(req: IReq<{ data: IFollowing }>, res: IRes) {
  await ActionService.setFollowing(req.body.data);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * 收藏视频
 */
async function favorites(req: IReq<{ data: IFavorites }>, res: IRes) {
  await ActionService.setFavorites(req.body.data);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * 点赞视频
 */
async function likeVideo(req: IReq<{ data: IFavorites }>, res: IRes) {
  await ActionService.setLikeVideo(req.body.data);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * 视频已看过
 */
async function videoWatched(req: IReq<{ data: { _id: string } }>, res: IRes) {
  await ActionService.addVideoWatched(req.body.data._id);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  following,
  favorites,
  likeVideo,
  videoWatched,
} as const;
