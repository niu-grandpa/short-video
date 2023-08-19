import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IAddVideo } from '@src/models/Video';
import VideoService from '@src/services/VideoService';
import { GenericPagination, IReq, IReqQuery, IRes } from '../types/types';

/**
 * 获取全部视频 - 分页
 */
async function all(
  // @ts-ignore
  req: IReqQuery<GenericPagination>,
  res: IRes
) {
  const data = await VideoService.getAll(req.query);
  return res.status(HttpStatusCodes.OK).json({ data });
}

/**
 * 获取1个视频
 */
async function one(req: IReqQuery<{ _id: string }>, res: IRes) {
  const data = await VideoService.getOne(req.query._id);
  return res.status(HttpStatusCodes.OK).json({ data });
}

/**
 * 随机获取1个视频
 */
async function random(_: IReqQuery<{}>, res: IRes) {
  const data = await VideoService.getRandom();
  return res.status(HttpStatusCodes.OK).json({ data });
}

/**
 * 添加视频
 */
async function add(req: IReq<{ data: IAddVideo }>, res: IRes) {
  const data = await VideoService.addOne(req.body.data);
  return res.status(HttpStatusCodes.OK).json({ data });
}

/**
 * 删除视频
 */
async function remove(req: IReqQuery<{ _id: string }>, res: IRes) {
  await VideoService.removeOne(req.query._id);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  all,
  one,
  add,
  random,
  remove,
} as const;
