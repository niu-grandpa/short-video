import { defineStore } from 'pinia';
import axios from '../plugins/axios';

// @ts-ignore
const $axios = axios().provide.axios;

// 用户行为数据流
export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    uid: '',
    icon: '',
    bio: '',
    token: '',
    gender: -1,
    nickname: '',
  }),

  actions: {},
});
