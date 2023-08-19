import { useRequest } from '~/hooks';
import { IFavorites, IFollowing } from '~/server/src/models/Action';

/**
 * 关注某人
 */
async function following(data: IFollowing): Promise<void> {
  return await useRequest({
    methods: 'PUT',
    url: '/actions/add-following',
    data,
  });
}

/**
 * 收藏视频
 */
async function favorites(data: IFavorites): Promise<void> {
  return await useRequest({
    methods: 'PUT',
    url: '/actions/add-favorites',
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
async function videoWatched(_id: string): Promise<void> {
  return await useRequest({
    methods: 'PUT',
    url: '/actions/video-watched',
    data: { _id },
  });
}

export default {
  following,
  favorites,
  likeVideo,
  videoWatched,
} as const;
