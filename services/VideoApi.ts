import { useRequest } from '~/hooks';
import { GetManyOfVideoByUid, IAddVideo, IVideo } from './types/video_api';

/**
 * 获取单个视频
 */
async function one(vid: string): Promise<IVideo> {
  return await useRequest({
    url: '/videos/one',
    data: { vid },
  });
}

/**
 * 获取随机视频
 */
async function random(size: number): Promise<IVideo[]> {
  return await useRequest({
    url: '/videos/random',
    data: { size },
  });
}

/**
 * 获取好友视频
 */
async function friends(data: GetManyOfVideoByUid): Promise<IVideo[]> {
  return await useRequest({
    url: '/videos/random',
    data,
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
async function remove(vid: string): Promise<void> {
  return await useRequest({
    methods: 'DELETE',
    url: '/videos/delete',
    data: { vid },
  });
}

export default {
  one,
  random,
  upload,
  remove,
  friends,
};
