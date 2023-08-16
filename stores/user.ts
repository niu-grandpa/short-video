import { defineStore } from 'pinia';
import { type ReplyData } from '~/components/VideoCommentsPost.vue';
import { AddUser } from '~/server/src/models/User';
import UserApi from '~/services/UserApi';
import { useGeneralStore } from './general';

// 用户行为数据流
export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    uid: '',
    token: '',
    role: 0,
    phoneNumber: '',
    posts: [],
  }),

  actions: {
    restData() {
      this.$state.uid = '';
      this.$state.token = '';
      this.$state.phoneNumber = '';
      this.$state.posts.length = 0;
    },

    setReplyData(val: ReplyData) {
      // @ts-ignore
      this.$state.replyData = val;
    },

    getToken() {
      const token = localStorage.getItem('user_token');
      this.$state.token = token ?? '';
    },

    // 当勾选自动登录时，调用此方法
    setToken(val: string) {
      this.$state.token = val;
      localStorage.setItem('user_token', val);
    },

    async login(data: string | AddUser) {
      // @ts-ignore
      const token = await UserApi.login(data);
      await useGeneralStore().getUserData();
      return token;
    },

    async getOne() {
      const { uid, posts, role, phoneNumber } = await UserApi.getOne();
      this.$state.uid = uid;
      this.$state.role = role;
      // @ts-ignore
      this.$state.posts = posts;
      this.$state.phoneNumber = phoneNumber;
    },

    async getAllUsers() {
      return await UserApi.getAll();
    },

    async logout() {
      return await UserApi.logout();
    },
  },
});
