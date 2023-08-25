import { useRequest } from '~/hooks';
import {
  AddComment,
  GetComments,
  IComment,
  UpdateComment,
} from './types/comment_api';

/**
 * 获取评论列表 - 分页
 */
async function list(data: GetComments): Promise<IComment[]> {
  return await useRequest({
    url: '/comments/list',
    data,
  });
}

/**
 * 发布评论
 */
async function post(data: AddComment): Promise<IComment> {
  return await useRequest({
    methods: 'POST',
    url: '/comments/post',
    data,
  });
}

/**
 * 编辑评论
 */
async function edit(data: UpdateComment): Promise<void> {
  return await useRequest({
    methods: 'PUT',
    url: '/comments/edit',
    data,
  });
}

/**
 * 删除评论
 */
async function remove(cid: string): Promise<void> {
  return await useRequest({
    methods: 'DELETE',
    url: '/comments/delete',
    data: { cid },
  });
}

export default {
  list,
  post,
  edit,
  remove,
};
