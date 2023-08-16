import { useGeneralStore } from '~/stores/general';
import { useUserStore } from '~/stores/user';

const route = useRoute();
const router = useRouter();

export const useASDCallback = (fn: () => any, to = '') => {
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
