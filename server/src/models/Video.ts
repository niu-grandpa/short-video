export interface IVideo {
  _id?: string;
  url: string;
  title: string;
  watched: number;
  uid: string;
  likes: number[];
  favorites: number[];
  created_at: number;
  permissions: {
    publicity: boolean;
    private: boolean;
    friends_only: boolean;
  };
}

export interface IAddVideo {
  url: string;
  title: string;
  name: string;
  uid: string;
}

/**
 * 创建视频数据
 */
function new_(data: IAddVideo): IVideo {
  return {
    ...data,
    watched: 0,
    likes: [],
    favorites: [],
    permissions: {
      publicity: true,
      private: false,
      friends_only: false,
    },
    created_at: Date.now(),
  };
}

export default {
  new: new_,
} as const;
