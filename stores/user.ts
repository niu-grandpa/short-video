import { defineStore } from 'pinia';
import axios from '../plugins/axios';

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

    updateUserImage: async (data: FormData) =>
      await $axios.post('/api/update-user-image', data),

    updateUser: async (name: string, bio: string) =>
      await $axios.patch('/api/update-user', { name, bio }),
  },
});
