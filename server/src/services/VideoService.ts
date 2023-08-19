import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import Video, { IAddVideo, IVideo } from '@src/models/Video';
import genera from '@src/models/genera';
import db from '@src/mongodb';
import { RouteError } from '@src/other/classes';
import { GenericPagination } from '@src/routes/types/types';
import { VIDEO_NOT_FOUND_ERR } from './ActionService';
import UserService from './UserService';

async function getAll({
  page,
  size,
  sort,
}: GenericPagination): Promise<IVideo[]> {
  const syncInfo = genera.updateOnceAuthorInfo(1);
  try {
    await syncInfo(UserService.getAll, db.CommentModel);
    // @ts-ignore
    return await db.VideoModel.find({})
      .sort({ created_at: sort ?? 1 })
      .skip(page * size)
      .limit(size);
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to get videos'
    );
  }
}

async function getOne(_id: string): Promise<IVideo> {
  const res = await db.VideoModel.findOne({ _id });
  if (!res) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, VIDEO_NOT_FOUND_ERR);
  }
  // @ts-ignore
  return res;
}

async function getRandom(): Promise<IVideo> {
  // 使用聚合管道的 $sample 阶段获取一个随机文档，并以数组的形式返回结果
  const res = await db.VideoModel.aggregate([{ $sample: { size: 1 } }]);
  if (!res.length) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, VIDEO_NOT_FOUND_ERR);
  }
  return res[0];
}

async function addOne(data: IAddVideo): Promise<IVideo> {
  try {
    const res = Video.new(data);
    await new db.VideoModel(res).save();
    return res;
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to upload video'
    );
  }
}

async function removeOne(_id: string): Promise<void> {
  try {
    await db.VideoModel.findOneAndRemove({ _id });
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to remove video'
    );
  }
}

export default {
  getAll,
  getOne,
  getRandom,
  addOne,
  removeOne,
} as const;
