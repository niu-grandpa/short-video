import { defineStore } from 'pinia';
import UserIcon from '~/assets/images/user-placeholder.jpg';
import axios from '~/plugins/axios';

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
    posts: [],
    allLikes: 0,
  }),
  actions: {
    async getProfile(_id: string) {
      this.restUser();
      this.allLikeCount();

      const { data } = await $axios.get(`/api/profiles/${_id}`);
      const { posts, user } = data;
      const { id, name, bio, image } = user[0];

      this.$state.id = id;
      this.$state.bio = bio;
      this.$state.name = name;
      this.$state.image = UserIcon;
      this.$state.posts = posts;
    },

    restUser() {
      this.$state.id = '';
      this.$state.bio = '';
      this.$state.name = '';
      this.$state.image = '';
      this.$state.posts = [];
    },

    allLikeCount() {
      this.allLikes = 0;
      for (let i = 0; i < this.posts.length; i++) {
        const post = this.posts[i];
        // @ts-ignore
        for (let j = 0; j < post.like.length; j++) {
          this.allLikes++;
        }
      }
    },
  },
  persist: true,
});
