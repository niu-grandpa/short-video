import { useGeneralStore } from '~/stores/general';
import { useOtherStore } from '~/stores/other';
import { useProfileStore } from '~/stores/profile';
import { useUserStore } from '~/stores/user';

// 以插件形式注入stores，构建全局数据流
// exp: const { $generalStore } = useNuxtApp();
export default defineNuxtPlugin(NuxtApp => {
  return {
    provide: {
      userStore: useUserStore(),
      profileStore: useProfileStore(),
      generalStore: useGeneralStore(),
      otherStore: useOtherStore(),
    },
  };
});
