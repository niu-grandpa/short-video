import { GenericPagination } from '@src/routes/types/types';

export const enum CommentLevel {
  ONE,
  TOW,
}

export interface IComment {
  _id?: string;
  uid: string;
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

export interface RemoveComment {
  _id: string;
  belong: string;
  level: CommentLevel;
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
function new_(data: AddComment): IComment {
  return {
    ...data,
    likes: [],
    updated_at: 0,
    created_at: Date.now(),
  };
}

export default {
  new: new_,
} as const;
