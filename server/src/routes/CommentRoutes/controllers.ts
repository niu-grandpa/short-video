import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AddComment } from '@src/models/Comments';
import CommentsService from '@src/services/CommentsService';
import { IReq, IReqQuery, IRes } from '../types/types';

/**
 * 获取一条评论列表
 */
async function get(req: IReqQuery<{ belong: string }>, res: IRes) {
  const data = await CommentsService.getOne(req.query.belong);
  return res.status(HttpStatusCodes.OK).json({ data });
}

/**
 * 添加一条评论
 */
async function add(req: IReq<{ data: AddComment }>, res: IRes) {
  const data = await CommentsService.addOne(req.body.data);
  return res.status(HttpStatusCodes.OK).json({ data });
}

/**
 * 移除一条评论
 */
async function remove(
  req: IReqQuery<{ belong: string; father_id: string; child_id: string }>,
  res: IRes
) {
  const data = await CommentsService.removeOne(req.query);
  return res.status(HttpStatusCodes.OK).json({ data });
}

export default {
  get,
  add,
  remove,
} as const;
