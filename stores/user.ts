import { defineStore } from 'pinia';
import axios from '../plugins/axios';

// @ts-ignore
const $axios = axios().provide.axios;

// 用户行为数据流
export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    uid: '',
    token: '',
    posts: [],
  }),

  actions: {
    restData() {
      this.$state.uid = '';
      this.$state.token = '';
      this.$state.posts.length = 0;
    },
  },
});
