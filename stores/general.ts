import { defineStore } from 'pinia';
import { IFavorites, IFollowing } from '~/server/src/models/Action';
import {
  AddComment,
  GetComments,
  UpdateComment,
} from '~/server/src/models/Comments';
import { IAddVideo } from '~/server/src/models/Video';
import { GenericPagination } from '~/server/src/routes/types/types';
import ActionApi from '~/services/ActionApi';
import CommentApi from '~/services/CommentApi';
import VideoApi from '~/services/VideoApi';
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

    getUserData() {
      return Promise.all([useUserStore().getOne, useProfileStore().getProfile]);
    },

    restData() {
      this.$state.backUrl = '/';
      this.$state.isLoginOpen = false;
      this.$state.isAutoLogin = false;
      this.$state.replyData = {
        postId: '',
        isReplySub: false,
        commentObj: undefined,
      };
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
