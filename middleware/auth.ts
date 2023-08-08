import { useUserStore } from '~/stores/user';

// 用户权限检测
export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  // @ts-ignore
  if (to !== '/' && !userStore.uid) {
    // useGeneralStore().isLoginOpen = true;
    // return navigateTo('/');
  }
});
