import { defineStore } from 'pinia';
import axios from '../plugins/axios';
import { useGeneralStore } from './general';

// @ts-ignore
const $axios = axios().provide.axios;

// 用户行为数据流
export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    id: '',
    name: '',
    bio: '',
    image: '',
  }),

  actions: {
    getTokens: async () => await $axios.get('/sanctum/csrf-cookie'),

    login: async (email: string, password: string) =>
      await $axios.post('/login', { email, password }),

    async getUser() {
      const { data } = await $axios.get('/api/logged-in-user');
      const { id, name, bio, image } = data[0];
      this.$state.id = id;
      this.$state.bio = bio;
      this.$state.name = name;
      this.$state.image = image;
    },

    async logout() {
      await $axios.post('/logout');
      this.restUser();
    },

    async register(
      name: string,
      email: string,
      password: string,
      confirmPassword: string
    ) {
      await $axios.post('/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });
    },

    restUser() {
      this.$state.id = '';
      this.$state.bio = '';
      this.$state.name = '';
      this.$state.image = '';
    },

    createPost: async (data: FormData) => await $axios.post('/api/posts', data),

    deletePost: async (post: any) =>
      await $axios.delete(`/api/posts/${post.id}`),

    updateUserImage: async (data: FormData) =>
      await $axios.post('/api/update-user-image', data),

    updateUser: async (name: string, bio: string) =>
      await $axios.patch('/api/update-user', { name, bio }),

    async likePost(post: any, isPostPage: boolean) {
      const { data } = await $axios.post('/api/likes', { post_id: post.id });

      const singlePost = isPostPage
        ? post
        : // @ts-ignore
          useGeneralStore().posts?.find(p => p.id === post.id);

      singlePost.likes.push(data.like);
    },

    async unlikePost(post: any, isPostPage: boolean) {
      let deleteLike = null;
      let singlePost = null;

      if (isPostPage) {
        singlePost = post;
      } else {
        // @ts-ignore
        singlePost = useGeneralStore().posts.find(p => p.id === post.id);
      }
      // @ts-ignore
      singlePost.likes.forEach(like => {
        if (like.user_id === this.id) {
          deleteLike = like;
        }
      });

      const { data } = await $axios.delete('/api/likes/' + deleteLike!.id);

      for (let i = 0; i < singlePost.likes.length; i++) {
        const like = singlePost.likes[i];
        if (like.id === data.like.id) {
          singlePost.likes.splice(i, 1);
          break;
        }
      }
    },

    async addComment(post: any, comment: any) {
      let res = await $axios.post('/api/comments', {
        post_id: post.id,
        comment: comment,
      });

      if (res.status === 200) {
        await this.updateComments(post);
      }
    },

    async deleteComment(post: any, commentId: number) {
      let res = await $axios.delete(`/api/comments/${commentId}`, {
        post_id: post.id,
      });

      if (res.status === 200) {
        await this.updateComments(post);
      }
    },

    async updateComments(post: any) {
      let res = await $axios.get(`/api/profiles/${post.user.id}`);

      for (let i = 0; i < res.data.posts.length; i++) {
        const updatePost = res.data.posts[i];

        if (post.id == updatePost.id) {
          // @ts-ignore
          useGeneralStore().selectedPos!.comments = updatePost.comments;
        }
      }
    },
  },
});
