import { defineStore } from 'pinia';
import axios from '../plugins/axios';

// @ts-ignore
const $axios = axios().provide.axios;

// 个人信息数据流
export const useProfileStore = defineStore('profile', {
  state: () => ({
    id: '',
    name: '',
    bio: '',
    image: '',
    post: null,
    posts: null,
    allLikes: 0,
  }),
  actions: {
    async getProfile(_id: string) {
      this.restUser();

      const { data } = await $axios.get(`/api/profiles/${_id}`);
      const { id, name, bio, image, posts } = data[0];

      this.$state.id = id;
      this.$state.bio = bio;
      this.$state.name = name;
      this.$state.image = image;
      this.$state.posts = posts;
    },

    restUser() {
      this.$state.id = '';
      this.$state.bio = '';
      this.$state.name = '';
      this.$state.image = '';
      this.$state.posts = null;
    },
  },
  persist: true,
});
