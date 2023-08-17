export interface IComments {
  belong: number;
  comments: ICommentItem[];
}

export interface ICommentItem {
  _id?: string;
  uid: string;
  avatar: string;
  author: string;
  likes: number;
  dislikes: number;
  content: string;
  create_time: number;
  update_time: number;
  replies: (ICommentItem[] & { father_id: string }) | [];
}

export interface ICreateComment {
  uid: string;
  avatar: string;
  author: string;
  content: string;
  belong_vid: string;
  its_father?: string;
}

/**
 * 创建新评论
 */
function new_(data: ICreateComment): ICommentItem {
  const { uid, avatar, author, content } = data;
  return {
    uid,
    avatar,
    author,
    content,
    likes: 0,
    dislikes: 0,
    create_time: Date.now(),
    update_time: 0,
    replies: [],
  };
}

export default {
  new: new_,
} as const;
