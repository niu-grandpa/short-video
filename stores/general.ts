import { defineStore } from 'pinia';
import axios from '../plugins/axios';
import { useUserStore } from './user';

// @ts-ignore
const $axios = axios().provide.axios;

// 用户通用数据流
export const useGeneralStore = defineStore('general', {
  persist: true,

  state: () => ({
    isLoginOpen: false,
    isEditProfileOpen: false,
    selectedPos: null,
    ids: null,
    isBackUrl: '/',
    posts: null,
    suggested: null,
    following: null,
  }),

  actions: {
    allLowerCaseNoCaps: (str: string) => str.split(' ').join('').toLowerCase(),

    async getRandomUsers(type: 'suggested' | 'following') {
      const res = await $axios.get(`/api/get-random-users`);
      type === 'suggested' && (this.suggested = res.data.suggested);
      type === 'following' && (this.following = res.data.following);
    },

    bodySwitch(val: boolean) {
      if (val) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    },

    // 检查seesion过期
    async hasSessionExpired() {
      // 当进入页面时，调用的任何api都会被axios拦截器拦截
      // 对状态码为 401、419、503做出处理，退出登录跳转到首页
      await $axios.interceptors.response.use(
        (response: any) => {
          return response;
        },
        (error: any) => {
          switch (error) {
            case 401: // 未登录
            case 419: // seesion过期
            case 503: // 服务器问题
              useUserStore().restUser();
              window.location.href = '/';
              break;
            case 500:
              alert('Oh! 服务器出了一些问题');
              break;
            default:
              return Promise.reject(error);
          }
        }
      );
    },

    setBackUrl(url: string) {
      this.isBackUrl = url;
    },

    updateSideMenuImage(array: any[], user: any) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === user.id) {
          array[i].image = user.image;
          break;
        }
      }
    },

    async getAllUsersAndPosts() {
      const { data } = await $axios.get('/api/home');
      this.posts = data;
    },
  },
});
