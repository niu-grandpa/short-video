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

export interface GenericPagination {
  page: number;
  size: number;
  /**正倒序 */
  sort?: 1 | -1;
}
