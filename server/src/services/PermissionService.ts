import { IPVidoe } from '@src/models/Permission';
import { IUser } from '@src/models/User';
import db from '@src/mongodb';

async function updateUser(
  token: string,
  permissions: IUser['permissions']
): Promise<void> {
  await db.UserModel.updateOne({ token }, { $set: { permissions } });
}

async function updateVideo({ _id, token, permissions }: IPVidoe) {
  await db.VideoModel.updateOne({ _id, token }, { $set: { permissions } });
}

export default {
  updateUser,
  updateVideo,
} as const;
