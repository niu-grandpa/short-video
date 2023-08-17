import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IFavorites, IFollowing } from '@src/models/Action';
import ActionService from '@src/services/ActionService';
import { IReq, IRes } from '../types/types';

/**
 * 关注某人
 */
async function following(req: IReq<{ data: IFollowing }>, res: IRes) {
  const {
    data: { uid, someone, flag },
  } = req.body;
  await ActionService.setFollowing(uid, someone, flag);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * 收藏视频
 */
async function favorites(req: IReq<{ data: IFavorites }>, res: IRes) {
  const {
    data: { uid, vid, flag },
  } = req.body;
  await ActionService.setFavorites(uid, vid, flag);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * 点赞视频
 */
async function likeVideo(req: IReq<{ data: IFavorites }>, res: IRes) {
  const {
    data: { uid, vid, flag },
  } = req.body;
  await ActionService.setLikeVideo(uid, vid, flag);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * 视频已看过
 */
async function videoWatched(req: IReq<{ data: IFavorites }>, res: IRes) {
  const { data } = req.body;
  await ActionService.addVideoWatched(data.vid);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  following,
  favorites,
  likeVideo,
  videoWatched,
} as const;
