import { useGeneralStore } from '~/stores/general';
import { useUserStore } from '~/stores/user';

// 用户权限检测
export default defineNuxtRouteMiddleware(({ path }) => {
  if ((path === '/friend' || path === '/upload') && !useUserStore().uid) {
    console.log('访问权限不足');
    useGeneralStore().isLoginOpen = true;
    return useRouter().replace('/');
  }
});
