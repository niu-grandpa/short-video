import { defineStore } from 'pinia';
import PermissionApi from '~/services/PermissionApi';
import UserApi from '~/services/UserApi';
import { IPUser, IPVideo } from '~/services/types/permission_api';
import { UserLogin, UserRoles } from '~/services/types/user_api';
import { useGeneralStore } from './general';

// 用户行为数据流
export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    uid: '',
    token: '',
    role: UserRoles.Standard,
    posts: [-1],
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
      this.$state.phoneNumber = '';
      this.$state.posts = [];
      this.$state.permissions = {
        no_access: false,
        lock_posts: false,
        lock_favorited: false,
      };
      this.$state.role = UserRoles.Standard;
      this.setToken('');
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

    /*
     * 调用用户接口的方法
     */

    async hasSessionExpired() {
      return await UserApi.isExpired();
    },

    async login(data: UserLogin) {
      const res = await UserApi.login(data);
      if (typeof res === 'string') {
        this.setToken(res);
      } else {
        this.setToken(res.token);
        this.$state.uid = res.uid;
      }
      await useGeneralStore().getUserData();
    },

    async logout() {
      return await UserApi.logout();
    },

    async getOne() {
      const { uid, posts, role, phoneNumber, permissions } =
        await UserApi.getOne();
      this.$state.uid = uid;
      this.$state.role = role;
      this.$state.posts = posts;
      this.$state.permissions = permissions;
      this.$state.phoneNumber = phoneNumber;
    },

    async getAll() {
      return await UserApi.getAll();
    },

    async getRecommend() {
      return await UserApi.recommend();
    },

    /*
     * 调用权限接口的方法
     */

    async setUserPermissions(data: IPUser) {
      await PermissionApi.user(data);
    },

    async setVideoPermissions(data: IPVideo) {
      await PermissionApi.video(data);
    },
  },
});
