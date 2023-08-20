export enum UserRoles {
  Standard,
  Admin,
  Anchor,
}

export enum UserGender {
  Unknown,
  Man,
  Female,
}

export interface IUser {
  uid: string;
  role: UserRoles;
  token: string;
  logged: boolean;
  posts: number[];
  favorites: number[];
  following: number[];
  followers: number[];
  phoneNumber: string;
  nickname: string;
  avatar: string;
  gender: UserGender;
  user_sign: string;
  permissions: {
    no_access: boolean;
    lock_posts: boolean;
    lock_favorited: boolean;
  };
}

export interface AddUser {
  phoneNumber: string;
  code: string;
}

export interface UserLogin extends Partial<AddUser> {
  token?: string;
}
