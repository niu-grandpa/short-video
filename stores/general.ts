import { defineStore } from 'pinia';
import UserApi from '~/services/UserApi';
import { useProfileStore } from './profile';
import { useUserStore } from './user';

// 通用数据流
export const useGeneralStore = defineStore('general', {
  persist: true,

  state: () => ({
    backUrl: '/',
    isLoginOpen: false,
    isAutoLogin: false,
    replyData: { postId: '', isReplySub: false, commentObj: undefined },
  }),

  actions: {
    setBackUrl(url: string) {
      if (url === this.$state.backUrl) return;
      this.$state.backUrl = url;
    },

    async hasSessionExpired() {
      await UserApi.isExpired();
    },

    getUserData() {
      return Promise.all([useUserStore().getOne, useProfileStore().getProfile]);
    },

    restData() {
      this.$state.backUrl = '/';
      this.$state.isLoginOpen = false;
      this.$state.isAutoLogin = false;
      this.$state.replyData = {
        postId: '',
        isReplySub: false,
        commentObj: undefined,
      };
    },
  },
});
