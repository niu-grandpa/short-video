import { defineStore } from 'pinia';
import axios from '../plugins/axios';

// @ts-ignore
const $axios = axios().provide.axios;

// 通用数据流
export const useGeneralStore = defineStore('general', {
  persist: true,

  state: () => ({
    isLoginOpen: false,
    isEditOpen: false,
  }),

  actions: {
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
  },
});
