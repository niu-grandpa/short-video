import { useGeneralStore } from '~/stores/general';
import { useUserStore } from '~/stores/user';

/**
 * 触发事件时用于验证用户权限
 * @param fn
 * @returns
 */
export const useASDCallback = (fn: (...args: any[]) => any) => {
  return (...args: any[]) => {
    const generalStore = useGeneralStore();
    const { token, hasSessionExpired } = useUserStore();
    if (!token) {
      generalStore.isLoginOpen = true;
      console.log('[useASDCallback]: 用户未登录');
    } else {
      let isExpired = false;
      hasSessionExpired().then(res => (isExpired = res));
      if (isExpired) {
        generalStore.restAll();
        generalStore.isLoginOpen = true;
        console.log('[useASDCallback]: 登录会话已过期');
      } else {
        try {
          fn(...args);
          console.log('[useASDCallback]: token=', token);
        } catch (error) {
          console.log('[useASDCallback]: 执行回调时发送错误: ', error);
        }
      }
    }
  };
};
