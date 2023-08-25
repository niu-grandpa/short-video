import { useRequest } from '~/hooks';
import { IFavorites, IFollowing, LikeComment } from './types/action_api';

/**
 * 关注某人
 */
async function following(data: IFollowing): Promise<void> {
  return await useRequest({
    methods: 'PUT',
    url: '/actions/set-following',
    data,
  });
}

/**
 * 收藏视频
 */
async function favorites(data: IFavorites): Promise<void> {
  return await useRequest({
    methods: 'PUT',
    url: '/actions/set-favorites',
    data,
  });
}

/**
 * 点赞视频
 */
async function likeVideo(data: IFavorites): Promise<void> {
  return await useRequest({
    methods: 'PUT',
    url: '/actions/like-video',
    data,
  });
}

/**
 * 视频已看过
 */
async function videoWatched(vid: string): Promise<void> {
  return await useRequest({
    methods: 'PUT',
    url: '/actions/video-watched',
    data: { vid },
  });
}

/**
 * 点赞评论
 */
async function likeComment(data: LikeComment): Promise<void> {
  return await useRequest({
    methods: 'PUT',
    url: '/actions/like-comment',
    data,
  });
}

export default {
  following,
  favorites,
  likeVideo,
  videoWatched,
  likeComment,
} as const;
