import { IPUser, IPVideo } from '@src/models/Permission';
import db from '@src/mongodb';

async function setUser({ token, permissions }: IPUser): Promise<void> {
  await db.UserModel.updateOne({ token }, { $set: { permissions } });
}

async function setVideo({ _id, uid, permissions }: IPVideo) {
  await db.VideoModel.updateOne({ _id, uid }, { $set: { permissions } });
}

export default {
  setUser,
  setVideo,
} as const;
