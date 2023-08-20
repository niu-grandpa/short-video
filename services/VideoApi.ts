import { useRequest } from '~/hooks';
import { GenericPagination } from './types/comment_api';
import { IAddVideo, IVideo } from './types/video_api';

/**
 * 获取视频列表 - 分页
 */
async function list(data: GenericPagination): Promise<IVideo[]> {
  return await useRequest({
    url: '/videos/list',
    data,
  });
}

/**
 * 获取单个视频
 */
async function one(_id: string): Promise<IVideo> {
  return await useRequest({
    url: '/videos/one',
    data: { _id },
  });
}

/**
 * 获取随机视频
 */
async function random(): Promise<IVideo> {
  return await useRequest({
    url: '/videos/random',
  });
}

/**
 * 上传视频
 */
async function upload(data: IAddVideo): Promise<void> {
  return await useRequest({
    methods: 'POST',
    url: '/videos/upload',
    data,
  });
}

/**
 * 删除视频
 */
async function remove(_id: string): Promise<void> {
  return await useRequest({
    methods: 'DELETE',
    url: '/videos/delete',
    data: { _id },
  });
}

export default {
  list,
  one,
  random,
  upload,
  remove,
};
