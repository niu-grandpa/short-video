import { defineStore } from 'pinia';
import ActionApi from '~/services/ActionApi';
import CommentApi from '~/services/CommentApi';
import VideoApi from '~/services/VideoApi';
import { IFavorites, IFollowing } from '~/services/types/action_api';
import {
  AddComment,
  GenericPagination,
  GetComments,
  UpdateComment,
} from '~/services/types/comment_api';
import { IAddVideo } from '~/services/types/video_api';
import { useProfileStore } from './profile';
import { useUserStore } from './user';

// 通用数据流
export const useGeneralStore = defineStore('general', {
  persist: true,

  state: () => ({
    backUrl: '/',
    isLoginOpen: false,
    isAutoLogin: false,
    replyData: { postId: '', isReplySub: false, commentObj: undefined },
  }),

  actions: {
    setBackUrl(url: string) {
      if (url === this.$state.backUrl) return;
      this.$state.backUrl = url;
    },

    getAutoLogin(): boolean {
      const res = localStorage.getItem('auto_login') === 'true' ?? false;
      this.$state.isAutoLogin = res;
      return res;
    },

    setAutoLogin(val: boolean) {
      this.$state.isAutoLogin = val;
      localStorage.setItem('auto_login', `${val}`);
    },

    getUserData() {
      return Promise.all([
        useUserStore().getOne(),
        useProfileStore().getProfile(),
      ]);
    },

    restData() {
      this.$state.backUrl = '/';
      this.$state.isLoginOpen = false;
      this.$state.replyData = {
        postId: '',
        isReplySub: false,
        commentObj: undefined,
      };
      this.setAutoLogin(false);
    },

    /*
     * 调用行为接口的方法
     */

    async following(data: IFollowing) {
      await ActionApi.following(data);
    },

    async favorites(data: IFavorites) {
      await ActionApi.favorites(data);
    },

    async likeVideo(data: IFavorites) {
      await ActionApi.likeVideo(data);
    },

    async watched(vid: string) {
      await ActionApi.videoWatched(vid);
    },

    /*
     * 调用视频接口的方法
     */

    async getVideos(data: GenericPagination) {
      return await VideoApi.list(data);
    },

    async getVideo(vid: string) {
      return await VideoApi.one(vid);
    },

    async getRandomVideo() {
      return await VideoApi.random();
    },

    async uploadVideo(data: IAddVideo) {
      await VideoApi.upload(data);
    },

    async removeVideo(vid: string) {
      await VideoApi.remove(vid);
    },

    async getComments(data: GetComments) {
      return await CommentApi.list(data);
    },

    async postComment(data: AddComment) {
      return await CommentApi.post(data);
    },

    async editComment(data: UpdateComment) {
      await CommentApi.edit(data);
    },

    async removeComment(cid: string) {
      await CommentApi.remove(cid);
    },
  },
});
