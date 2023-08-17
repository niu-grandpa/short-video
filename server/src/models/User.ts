import EnvVars from '@src/constants/EnvVars';
import jwt, { JwtPayload } from 'jsonwebtoken';

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
  privacy_settings: {
    no_access: boolean;
    lock_posts: boolean;
    lock_favorited: boolean;
  };
}

export interface AddUser {
  phoneNumber: string;
  code: string;
}

/**
 * Create new User.
 */
function new_(phoneNumber: string, code: string): IUser {
  const timestamp = Date.now();
  const uid = `2${phoneNumber.slice(6)}${timestamp % 100}${code[0]}`;
  return {
    uid,
    role: UserRoles.Standard,
    gender: UserGender.Unknown,
    token: setUserToken({ uid, phoneNumber }),
    logged: false,
    posts: [],
    favorites: [],
    following: [],
    followers: [],
    phoneNumber,
    avatar: '',
    user_sign: '',
    nickname: `用户_${timestamp}`,
    privacy_settings: {
      no_access: false,
      lock_posts: false,
      lock_favorited: false,
    },
  };
}

function setUserToken(payload: object): string {
  const expiresIn = EnvVars.Jwt.Exp;
  return jwt.sign(payload, EnvVars.Jwt.Secret, { expiresIn });
}

function isTokenExpired(token: string) {
  try {
    const decoded = jwt.verify(token, EnvVars.Jwt.Secret);
    const isExpired = Date.now() >= (decoded as JwtPayload).exp! * 1000;
    return isExpired;
  } catch (error) {
    throw 'Invalid token';
  }
}

export default {
  new: new_,
  setUserToken,
  isTokenExpired,
} as const;
