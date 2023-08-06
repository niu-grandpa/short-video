import { useGeneralStore } from '~/stores/general';
import { useUserStore } from '~/stores/user';

export default defineNuxtPlugin(() => ({
  provide: {
    useAuthCallback: (fn: () => any, to = '/') => {
      const route = useRoute();
      const router = useRouter();
      if (!useUserStore().id) {
        return () => {
          if (route.fullPath !== '/') router.push(to);
          useGeneralStore().isLoginOpen = true;
        };
      }
      return fn;
    },
  },
}));
