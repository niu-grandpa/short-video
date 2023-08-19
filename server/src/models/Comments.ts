import { GenericPagination } from '@src/routes/types/types';

export const enum CommentLevel {
  ONE,
  TOW,
}

export interface IComment {
  _id?: string;
  uid: string;
  avatar: string;
  author: string;
  belong: string;
  likes: number[];
  content: string;
  level: CommentLevel;
  created_at: number;
  updated_at: number;
}

export interface AddComment {
  uid: string;
  content: string;
  belong: string;
  level: CommentLevel;
}

export interface UpdateComment {
  _id: string;
  content: string;
}

export interface LikeComment {
  uid: string;
  _id: string;
  flag: boolean;
}

export interface GetComments extends GenericPagination {
  belong: string;
  level: CommentLevel;
}

/**
 * 创建新评论
 */
function new_(data: AddComment & { author: string; avatar: string }): IComment {
  return {
    ...data,
    author: '',
    avatar: '',
    likes: [],
    updated_at: 0,
    created_at: Date.now(),
  };
}

export default {
  new: new_,
} as const;
