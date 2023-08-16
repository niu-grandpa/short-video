import { useGeneralStore } from '~/stores/general';
import { useUserStore } from '~/stores/user';

export const useASDCallback = (fn: () => any, to = '') => {
  const router = useRouter();

  if (!useUserStore().uid) {
    return () => {
      if (to !== '') {
        router.push(to);
      }
      useGeneralStore().isLoginOpen = true;
    };
  }
  return fn;
};
