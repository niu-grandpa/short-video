import { defineStore } from 'pinia';
import { IFavorites, IFollowing } from '~/server/src/models/Action';
import { AddUser, UserRoles } from '~/server/src/models/User';
import ActionApi from '~/services/ActionApi';
import UserApi from '~/services/UserApi';
import { useGeneralStore } from './general';

// 用户行为数据流
export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    uid: '',
    token: '',
    role: UserRoles.Standard,
    posts: [],
    phoneNumber: '',
    permissions: {
      no_access: false,
      lock_posts: false,
      lock_favorited: false,
    },
  }),

  actions: {
    restData() {
      this.$state.uid = '';
      this.$state.token = '';
      this.$state.phoneNumber = '';
      this.$state.posts.length = 0;
      this.$state.permissions = {
        no_access: false,
        lock_posts: false,
        lock_favorited: false,
      };
      this.$state.role = UserRoles.Standard;
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

    async following(data: IFollowing) {
      await ActionApi.following(data);
    },

    async favorites(data: IFavorites) {
      await ActionApi.favorites(data);
    },

    async likeVideo(data: IFavorites) {
      await ActionApi.likeVideo(data);
    },

    async watched(vid: string) {
      await ActionApi.videoWatched(vid);
    },
  },
});
