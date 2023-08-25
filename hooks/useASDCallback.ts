import { useGeneralStore } from '~/stores/general';
import { useUserStore } from '~/stores/user';

export const useASDCallback = (fn: (...args: any[]) => any, to = '') => {
  const router = useRouter();
  const userStore = useUserStore();
  const generalStore = useGeneralStore();

  const rest = () => {
    generalStore.restAll();
    generalStore.isLoginOpen = true;
  };

  if (!userStore.uid) {
    return () => {
      if (to !== '') router.push(to);
      rest();
      console.log('用户未登录');
    };
  } else if (userStore.token) {
    let isExpired = false;
    userStore.hasSessionExpired().then(res => (isExpired = res));
    if (isExpired) {
      return () => {
        rest();
        console.log('登录会话已过期');
      };
    }
  }

  return fn;
};
