import { AddUser } from '@/server/src/models/User';
import { defineStore } from 'pinia';
import UserApi from 'services/UserApi';
import { type ReplyData } from '~/components/VideoCommentsPost.vue';
import { useGeneralStore } from './general';

const generalStore = useGeneralStore();

// 用户行为数据流
export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    uid: '',
    token: '',
    role: 0,
    phoneNumber: '',
    posts: [],
    replyData: { postId: '', isReplySub: false, commentObj: undefined },
  }),

  actions: {
    restData() {
      this.$state.uid = '';
      this.$state.token = '';
      this.$state.phoneNumber = '';
      this.$state.posts.length = 0;
      this.$state.replyData = {
        postId: '',
        isReplySub: false,
        commentObj: undefined,
      };
    },

    setReplyData(val: ReplyData) {
      // @ts-ignore
      this.$state.replyData = val;
    },

    getToken() {
      const token = localStorage.getItem('user_token');
      this.$state.token = token ?? '';
    },

    setToken(val: string) {
      this.$state.token = val;
      localStorage.setItem('user_token', val);
    },

    async login(data: AddUser) {
      this.$state.token = await UserApi.login(data);
    },

    async autoLogin() {
      if (this.$state.token) {
        this.$state.token = await UserApi.login(this.$state.token);
      } else {
        generalStore.isLoginOpen = true;
      }
    },

    async getOne() {
      const { uid, posts, role, phoneNumber } = await UserApi.getOne();
      this.$state.uid = uid;
      this.$state.role = role;
      this.$state.posts = posts;
      this.$state.phoneNumber = phoneNumber;
    },

    async getAll() {
      return await UserApi.getAll();
    },
  },
});
