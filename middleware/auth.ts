import { useGeneralStore } from 'stores/general';
import { useUserStore } from 'stores/user';

// 用户权限检测
export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  if (to !== '/' && !userStore.id) {
    useGeneralStore().isLoginOpen = true;
    return navigateTo('/');
  }
});
