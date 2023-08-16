import { defineStore } from 'pinia';

// 通用数据流
export const useGeneralStore = defineStore('general', {
  persist: true,

  state: () => ({
    backUrl: '/',
    isLoginOpen: false,
  }),

  actions: {
    setBackUrl(url: string) {
      if (url === this.$state.backUrl) return;
      this.$state.backUrl = url;
    },
  },
});
