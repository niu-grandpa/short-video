import { useRequest } from '~/hooks';
import { IPVideo } from './types/permission_api';
import { IUser } from './types/user_api';

/**
 * 设置用户个人权限
 */
async function user(data: IUser['permissions']): Promise<void> {
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
