import { defineStore } from 'pinia';
import Icon from '~/assets/images/user-placeholder.jpg';
import axios from '~/plugins/axios';

// @ts-ignore
const $axios = axios().provide.axios;

// 个人信息数据流
export const useProfileStore = defineStore('profile', {
  persist: true,

  state: () => ({
    icon: Icon,
    post: null,
    gender: -1,
    allStars: 0,
    following: 0, // 我关注的人
    followers: 0, // 粉丝数
    nickname: '',
    user_sign: '',
  }),

  actions: {
    restData() {
      this.$state.icon = '';
      this.$state.gender = -1;
      this.$state.allStars = 0;
      this.$state.nickname = '';
      this.$state.followers = 0;
      this.$state.following = 0;
      this.$state.post = null;
    },
  },
});
