export interface IVideo {
  vid: string;
  url: string;
  title: string;
  watched: number;
  uid: string;
  author: string;
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
