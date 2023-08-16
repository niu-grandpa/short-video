import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import User, { AddUser, IUser, UpdateUser } from '@src/models/User';
import db from '@src/mongodb';
import { RouteError } from '@src/other/classes';

export const USER_NOT_FOUND_ERR = 'User not found';
export const USER_ALREADY_EXISTS = 'User already exists';
export const USER_LOGGED_IN = 'User logged in';
export const USER_LOGIN_EXPIRED = 'User login session has expired';

async function getAll(): Promise<IUser[]> {
  return await db.UserModel.find();
}

async function getOne(token: string): Promise<IUser> {
  const user = await db.UserModel.findOne({ token });
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  // @ts-ignore
  return user;
}

async function getProfile(uid: string) {
  const user = await db.UserModel.findOne({ uid });
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  const { token, logged, phoneNumber, ...rest } = user;
  return rest;
}

async function addOne({ phoneNumber, code }: AddUser): Promise<string> {
  const res = await db.UserModel.findOne({ phoneNumber });
  if (res) {
    throw new RouteError(HttpStatusCodes.OK, USER_ALREADY_EXISTS);
  }
  const newUser = User.new(phoneNumber, code);
  await new db.UserModel({
    ...newUser,
  }).save();
  return newUser.token;
}

async function updateOne(
  token: string,
  { nickname, avatar, user_sign, role, gender }: UpdateUser
): Promise<void> {
  try {
    const user = await getOne(token);
    await db.UserModel.updateOne(
      { token },
      {
        $set: {
          role: role ?? user.role,
          gender: gender ?? user.gender,
          avatar: avatar ?? user.avatar,
          nickname: nickname ?? user.nickname,
          user_sign: user_sign ?? user.user_sign,
        },
      }
    );
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to update user'
    );
  }
}

async function login(token: string): Promise<string>;
async function login(obj: AddUser): Promise<string>;
async function login(params: string | AddUser): Promise<string> {
  let filterKey = {},
    token = '';

  if (typeof params === 'string') {
    if (User.isTokenExpired(params))
      throw new RouteError(HttpStatusCodes.UNAUTHORIZED, USER_LOGIN_EXPIRED);
    filterKey = { token: params };
  } else {
    filterKey = { phoneNumber: params.phoneNumber };
    await db.UserModel.updateOne(filterKey, {
      $set: { token: User.setUserToken(params) },
    });
  }

  const user = await db.UserModel.findOne(filterKey);
  token = user?.token ?? '';

  if (!user && typeof params !== 'string') {
    const { phoneNumber, code } = params;
    token = await addOne({ phoneNumber, code });
  } else if (user?.logged) {
    throw new RouteError(HttpStatusCodes.TOO_MANY_REQUESTS, USER_LOGGED_IN);
  }

  await db.UserModel.updateOne(filterKey, { $set: { logged: true } });

  return token;
}

async function logout(token: string): Promise<void> {
  await db.UserModel.updateOne({ token }, { $set: { logged: false } });
}

export default {
  login,
  logout,
  getAll,
  getOne,
  addOne,
  updateOne,
  getProfile,
};
