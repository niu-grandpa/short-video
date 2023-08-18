/**
 * Express router paths go here.
 */

import { Immutable } from '@src/other/types';

const Paths = {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    One: '/one',
    Update: '/update',
    Login: '/login',
    Logout: '/logout',
    Profile: '/profile',
    HasSessionExpired: '/has-session-expired',
  },
  Videos: {
    Base: '/videos',
  },
  Actions: {
    Base: '/actions',
    Followers: '/set-followers',
    Following: '/set-following',
    Favorites: '/set-favorites',
    LikeVideo: '/like-video',
    VideoWatched: '/video-watched',
  },
  Comments: {
    Base: '/comments',
    Get: '/get',
    Add: '/add',
    Remove: '/remove',
  },
};

// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
