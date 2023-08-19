import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AddComment, GetComments, UpdateComment } from '@src/models/Comments';
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

async function add(req: IReq<{ data: AddComment }>, res: IRes) {
  const data = await CommentsService.addOne(req.body.data);
  return res.status(HttpStatusCodes.OK).json({ data });
}

async function update(req: IReq<{ data: UpdateComment }>, res: IRes) {
  await CommentsService.updateOne(req.body.data);
  return res.status(HttpStatusCodes.OK).end();
}

async function remove(req: IReqQuery<{ _id: string }>, res: IRes) {
  await CommentsService.removeOne(req.query._id);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  get,
  add,
  update,
  remove,
} as const;
