interface IGeneral {
  uid: string;
  flag: boolean;
}

export interface IFollowing extends IGeneral {
  someone: string;
}

export interface IFavorites extends IGeneral {
  _id: string;
}
