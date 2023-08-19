import { Model } from 'mongoose';
import { IUser } from './User';

/**
 * 用于获取视频数据或评论列表数据时，同步一次所有用户的头像、昵称
 */
function updateOnceAuthorInfo(
  count: number
): (getUsers: () => Promise<IUser[]>, dbModel: Model<any>) => Promise<void> {
  let c = count;
  return async (getUsers, dbModel) => {
    if (c > 1) return;
    c++;
    const users = await getUsers();
    for (const { uid, avatar, nickname } of users) {
      try {
        await dbModel.updateMany(
          { uid },
          { $set: { avatar, author: nickname } }
        );
      } catch (error) {
        continue;
      }
    }
  };
}

export default {
  updateOnceAuthorInfo,
} as const;
