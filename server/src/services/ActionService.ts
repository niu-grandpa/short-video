import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { LikeComment } from '@src/models/Comments';
import db from '@src/mongodb';
import { RouteError } from '@src/other/classes';

export const VIDEO_NOT_FOUND_ERR = 'Video not found';
export const VIDEO_OPERATION_ERR = 'An error occurred in the operation video';

// 关注某人
async function setFollowing(
  uid: string,
  someone: string,
  flag: boolean
): Promise<void> {
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
async function setFavorites(uid: string, vid: string, flag: boolean) {
  try {
    const key = flag ? '$addToSet' : '$pull';
    await db.UserModel.updateOne({ uid }, { [key]: { favorites: { vid } } });
    await db.VideoModel.updateOne({ vid }, { [key]: { favorites: { uid } } });
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      VIDEO_OPERATION_ERR
    );
  }
}

// 点赞视频
async function setLikeVideo(uid: string, vid: string, flag: boolean) {
  try {
    await db.VideoModel.updateOne(
      { vid },
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
async function addVideoWatched(vid: string) {
  try {
    // @ts-ignore
    const { watched } = await db.VideoModel.findOne({ vid })!;
    await db.VideoModel.updateOne({ vid }, { $set: { watched: watched + 1 } });
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      VIDEO_NOT_FOUND_ERR
    );
  }
}

// 评论点赞&点踩
async function setLikeComment(data: LikeComment) {
  const key = data.flag ? '$addToSet' : '$pull';
  // 子评论
  if (data?.child_id) {
    await db.CommentModel.updateOne(
      {
        belong: data.belong,
        'comments._id': data.father_id,
        'comments.replies._id': data.child_id,
      },
      { [key]: { 'comments.$.replies.${elem}.likes': data.uid } }
    );
  } else {
    // 父评论
    await db.CommentModel.updateOne(
      {
        belong: data.belong,
        'comments._id': data.father_id,
      },
      { [key]: { 'comments.$.likes': data.uid } }
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
