// 用户权限检测
export default defineNuxtRouteMiddleware((to, from) => {
  // @ts-ignore
  if (to !== '/' && !localStorage.getItem('user_token')) {
    return navigateTo('/');
  }
});
