import { defineStore } from 'pinia';
import { IUser } from '~/services/types/user_api';
import UserApi from '~/services/UserApi';

// 个人信息数据流
export const useProfileStore = defineStore('profile', {
  persist: true,

  state: () => ({
    icon: '',
    post: null,
    gender: 0,
    favorites: Array<string>(), // 我的收藏
    following: Array<string>(), // 我关注的人
    followers: Array<string>(), // 粉丝数
    nickname: '未登录',
    user_sign: '',
  }),

  actions: {
    restData() {
      this.$state.icon = '';
      this.$state.gender = 0;
      this.$state.nickname = '未登录';
      this.$state.user_sign = '';
      this.$state.favorites = [];
      this.$state.followers = [];
      this.$state.following = [];
      this.$state.post = null;
    },

    async getProfile(uid?: string) {
      const res = await UserApi.profile(uid);
      // 没有传入uid说明是查看本人信息，用的是token请求
      if (!uid) {
        this.$state.icon = res.avatar;
        this.$state.gender = res.gender;
        this.$state.nickname = res.nickname;
        this.$state.user_sign = res.user_sign;
        this.$state.favorites = res.favorites;
        this.$state.followers = res.followers;
        this.$state.following = res.following;
      }
      return res;
    },

    async updateProfile(data: IUser) {
      await UserApi.update(data);
    },
  },
});
