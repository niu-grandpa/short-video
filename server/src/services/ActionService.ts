import db from '@src/mongodb';

// 关注某人
async function addToFollowing(uid: string, someone: string): Promise<void> {
  await db.UserModel.updateOne(
    { uid },
    { $addToSet: { following: { someone } } }
  );
  await addToFollowers(someone, uid);
}

// 关注我的人
async function addToFollowers(uid: string, someone: string): Promise<void> {
  await db.UserModel.updateOne(
    { uid },
    { $addToSet: { followers: { someone } } }
  );
}

// 取消关注
async function cancelFollowing(uid: string, someone: string): Promise<void> {
  await db.UserModel.updateOne(
    { uid },
    { $pull: { following: { someone }, followers: { someone } } }
  );
}

// 收藏视频
async function addToFavorites(uid: string, vid: string) {
  await db.UserModel.updateOne({ uid }, { $addToSet: { favorites: { vid } } });
  await db.VideoModel.updateOne({ vid }, { $addToSet: { favorites: { uid } } });
}

// 点赞视频
async function setLikeVideo(uid: string, vid: string) {
  await db.VideoModel.updateOne({ vid }, { $addToSet: { likes: { uid } } });
}

export default {
  addToFollowers,
  addToFollowing,
  cancelFollowing,
  addToFavorites,
  setLikeVideo,
} as const;
