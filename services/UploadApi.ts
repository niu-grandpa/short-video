import { useRequest } from '~/hooks';

/**
 * 上传视频
 */
async function video(data: FormData): Promise<void> {
  return await useRequest({
    methods: 'POST',
    url: '/upload/video',
    contentType: 'multipart/form-data',
    data,
  });
}

/**
 * 上传用户头像
 */
async function avatar(data: FormData): Promise<void> {
  return await useRequest({
    methods: 'POST',
    url: '/upload/user-avatar',
    contentType: 'multipart/form-data',
    data,
  });
}

export default {
  video,
  avatar,
};
