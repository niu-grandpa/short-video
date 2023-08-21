import { defineStore } from 'pinia';
import PermissionApi from '~/services/PermissionApi';
import UserApi from '~/services/UserApi';
import { IPVideo } from '~/services/types/permission_api';
import { IUser, UserLogin, UserRoles } from '~/services/types/user_api';

// 用户行为数据流
export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    uid: '',
    token: '',
    role: UserRoles.Standard,
    posts: Array<number>(),
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

    getToken(): Promise<string | null> {
      const token = localStorage.getItem('user_token');
      token && this.setToken(token);
      return new Promise(res => {
        res(token);
      });
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

    async setUserPermissions(data: IUser['permissions']) {
      await PermissionApi.user(data);
      this.$state.permissions = data;
    },

    async setVideoPermissions(data: IPVideo) {
      await PermissionApi.video(data);
    },
  },
});
