export interface IComments {
  belong: string;
  comments: ICommentItem[];
}

export interface ICommentItem {
  _id?: string;
  uid: string;
  avatar: string;
  author: string;
  likes: number[];
  content: string;
  create_time: number;
  update_time: number;
  replies?: (ICommentItem & { father_id: string })[] | [];
}

export interface AddComment {
  uid: string;
  avatar: string;
  author: string;
  content: string;
  belong: string;
  father_id?: string;
}

export interface RemoveComment {
  belong: string;
  father_id: string;
  child_id?: string;
}

export interface LikeComment extends RemoveComment {
  uid: string;
  flag: boolean;
}

/**
 * 创建新评论
 */
function new_(data: AddComment): ICommentItem {
  const obj: ICommentItem = {
    ...data,
    likes: [],
    update_time: 0,
    create_time: Date.now(),
  };
  !data.father_id ?? (obj.replies = []);
  return obj;
}

export default {
  new: new_,
} as const;
