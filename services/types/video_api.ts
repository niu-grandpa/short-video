import { GenericPagination } from './comment_api';

export interface IVideo {
  vid: string;
  url: string;
  title: string;
  watched: number;
  uid: string;
  author: string;
  gif: string;
  poster: string;
  comments: number;
  likes: string[];
  favorites: string[];
  created_at: number;
  permissions: {
    publicity: boolean;
    private: boolean;
    friends_only: boolean;
  };
}

export interface GetManyOfVideoByUid extends GenericPagination {
  uid: string[];
}
