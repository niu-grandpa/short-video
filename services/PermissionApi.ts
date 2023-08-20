import { useRequest } from '~/hooks';
import { IPUser, IPVideo } from './types/permission_api';

/**
 * 设置用户个人权限
 */
async function user(data: IPUser): Promise<void> {
  return await useRequest({
    methods: 'PUT',
    url: '/permissions/set-user',
    data,
  });
}

/**
 * 设置用户个人权限
 */
async function video(data: IPVideo): Promise<void> {
  return await useRequest({
    methods: 'PUT',
    url: '/permissions/set-video',
    data,
  });
}

export default {
  user,
  video,
};
