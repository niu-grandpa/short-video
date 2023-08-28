import { defineStore } from 'pinia';
import ActionApi from '~/services/ActionApi';
import CommentApi from '~/services/CommentApi';
import VideoApi from '~/services/VideoApi';
import {
  IFavorites,
  IFollowing,
  LikeComment,
} from '~/services/types/action_api';
import {
  AddComment,
  GetComments,
  UpdateComment,
} from '~/services/types/comment_api';
import { GetManyOfVideoByUid, IAddVideo } from '~/services/types/video_api';
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

    restAll() {
      this.restData();
      useUserStore().restData();
      useProfileStore().restData();
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

    async likeComment(data: LikeComment) {
      await ActionApi.likeComment(data);
    },

    async watched(vid: string) {
      await ActionApi.videoWatched(vid);
    },

    /*
     * 调用视频接口的方法
     */

    async getOneVideo(vid: string) {
      return await VideoApi.one(vid);
    },

    async getFriendVideos(data: GetManyOfVideoByUid) {
      return await VideoApi.friends(data);
    },

    async getRandomVideo(size = 1) {
      return await VideoApi.random(size);
    },

    async uploadVideo(data: IAddVideo) {
      await VideoApi.upload(data);
    },

    async removeVideo(vid: string) {
      await VideoApi.remove(vid);
    },

    /*
     * 调用评论接口的方法
     */

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
