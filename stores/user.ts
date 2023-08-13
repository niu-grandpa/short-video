import { defineStore } from 'pinia';
import { type ReplyData } from '~/components/VideoCommentsPost.vue';
import axios from '~/plugins/axios';

// @ts-ignore
const $axios = axios().provide.axios;

// 用户行为数据流
export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    uid: '',
    token: '',
    posts: [],
    replyData: { postId: '', isReplySub: false, commentObj: undefined },
  }),

  actions: {
    setReplyData(val: ReplyData) {
      this.$state.replyData = val;
    },

    restData() {
      this.$state.uid = '';
      this.$state.token = '';
      this.$state.posts.length = 0;
    },
  },
});
