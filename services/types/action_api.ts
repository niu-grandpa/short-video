interface IGeneral {
  uid: string;
  flag: boolean;
}

export interface IFollowing extends IGeneral {
  someone: string;
}

export interface IFavorites extends IGeneral {
  vid: string;
}

export interface LikeComment extends IGeneral {
  cid: string;
  reset?: boolean;
}
