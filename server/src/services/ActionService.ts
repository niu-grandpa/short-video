import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IFavorites, IFollowing } from '@src/models/Action';
import { LikeComment } from '@src/models/Comments';
import db from '@src/mongodb';
import { RouteError } from '@src/other/classes';

export const VIDEO_NOT_FOUND_ERR = 'Video not found';
export const VIDEO_OPERATION_ERR = 'An error occurred in the operation video';

// 关注某人
async function setFollowing({ uid, someone, flag }: IFollowing): Promise<void> {
  try {
    await db.UserModel.updateOne(
      { uid },
      { [flag ? '$addToSet' : '$pull']: { following: { someone } } }
    );
    await setFollowers(someone, uid, flag);
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      VIDEO_OPERATION_ERR
    );
  }
}

// 关注我的人
async function setFollowers(
  uid: string,
  someone: string,
  flag: boolean
): Promise<void> {
  try {
    await db.UserModel.updateOne(
      { uid },
      { [flag ? '$addToSet' : '$pull']: { followers: { someone } } }
    );
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      VIDEO_OPERATION_ERR
    );
  }
}

// 收藏视频
async function setFavorites({ _id, flag, uid }: IFavorites) {
  try {
    const key = flag ? '$addToSet' : '$pull';
    await db.UserModel.updateOne({ uid }, { [key]: { favorites: { _id } } });
    await db.VideoModel.updateOne({ _id }, { [key]: { favorites: { uid } } });
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      VIDEO_OPERATION_ERR
    );
  }
}

// 点赞视频
async function setLikeVideo({ _id, flag, uid }: IFavorites) {
  try {
    await db.VideoModel.updateOne(
      { _id },
      { [flag ? '$addToSet' : '$pull']: { likes: { uid } } }
    );
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      VIDEO_OPERATION_ERR
    );
  }
}

// 添加视频浏览量
async function addVideoWatched(_id: string) {
  try {
    // @ts-ignore
    const { watched } = await db.VideoModel.findOne({ _id });
    await db.VideoModel.updateOne({ _id }, { $set: { watched: watched + 1 } });
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      VIDEO_NOT_FOUND_ERR
    );
  }
}

// 评论点赞&点踩
async function setLikeComment({ uid, _id, flag }: LikeComment) {
  try {
    await db.CommentModel.findOneAndUpdate(
      { _id },
      { [flag ? '$addToSet' : '$pull']: { likes: { uid } } }
    );
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Comment like operation failed'
    );
  }
}

export default {
  setFollowing,
  setFavorites,
  setLikeVideo,
  addVideoWatched,
  setLikeComment,
} as const;
