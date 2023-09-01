import { useGeneralStore } from '~/stores/general';
import { useUserStore } from '~/stores/user';

export const useASDCallback = (fn: (...args: any[]) => any, to = '') => {
  const router = useRouter();
  const { uid, token, hasSessionExpired } = useUserStore();
  const generalStore = useGeneralStore();

  if (!uid) {
    return () => {
      if (to !== '') router.push(to);
      generalStore.isLoginOpen = true;
      console.log('[useASDCallback]: 用户未登录');
    };
  } else if (token) {
    let isExpired = false;
    hasSessionExpired().then(res => (isExpired = res));
    if (isExpired) {
      return () => {
        generalStore.restAll();
        console.log('[useASDCallback]: 登录会话已过期');
      };
    }
  }

  return fn;
};
