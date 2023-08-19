import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import {
  AddComment,
  GetComments,
  RemoveComment,
  UpdateComment,
} from '@src/models/Comments';
import CommentsService from '@src/services/CommentsService';
import { IReq, IReqQuery, IRes } from '../types/types';

/**
 * 获取评论数据
 */
async function get(
  // @ts-ignore
  req: IReqQuery<GetComments>,
  res: IRes
) {
  const data = await CommentsService.getList(req.query);
  return res.status(HttpStatusCodes.OK).json({ data });
}

async function add(req: IReq<AddComment>, res: IRes) {
  const data = await CommentsService.addOne(req.body);
  return res.status(HttpStatusCodes.OK).json({ data });
}

async function update(req: IReq<UpdateComment>, res: IRes) {
  await CommentsService.updateOne(req.body);
  return res.status(HttpStatusCodes.OK).end();
}

// @ts-ignore
async function remove(req: IReqQuery<RemoveComment>, res: IRes) {
  await CommentsService.removeOne(req.query);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  get,
  add,
  update,
  remove,
} as const;
