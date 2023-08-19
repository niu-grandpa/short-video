import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import User, { AddUser, IUser, UserLogin } from '@src/models/User';
import db from '@src/mongodb';
import { RouteError } from '@src/other/classes';

async function getAll(): Promise<IUser[]> {
  try {
    return await db.UserModel.find();
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to get users'
    );
  }
}

async function getRandom(): Promise<IUser[]> {
  try {
    return await db.UserModel.aggregate([{ $sample: { size: 4 } }]);
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to get random users'
    );
  }
}

async function getOne(token: string): Promise<IUser> {
  const user = await db.UserModel.findOne({ token });
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }
  // @ts-ignore
  return user;
}

async function getProfile(uid: string): Promise<Partial<IUser>> {
  const user = await db.UserModel.findOne({ uid });
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }
  const { token, logged, phoneNumber, ...rest } = user;
  // @ts-ignore
  return rest;
}

async function addOne(data: AddUser): Promise<object> {
  const res = await db.UserModel.findOne({ phoneNumber: data.phoneNumber });
  if (res) {
    throw new RouteError(HttpStatusCodes.OK, 'User already exists');
  }
  try {
    const newUser = User.new(data);
    await new db.UserModel({
      ...newUser,
    }).save();
    return { uid: newUser.uid, token: newUser.token };
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      'User registration failed'
    );
  }
}

async function updateOne(
  token: string,
  newData: Partial<IUser>
): Promise<void> {
  try {
    const oldData = await getOne(token);
    const update = {
      role: newData.role ?? oldData.role,
      gender: newData.gender ?? oldData.gender,
      avatar: newData.avatar ?? oldData.avatar,
      nickname: newData.nickname ?? oldData.nickname,
      user_sign: newData.user_sign ?? oldData.user_sign,
      permissions: newData.permissions ?? oldData.permissions,
    };
    await db.UserModel.updateOne({ token }, { $set: update });
  } catch (error) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      'Failed to update user profile, maybe the user does not exist'
    );
  }
}

function hasSessionExpired(token: string): boolean {
  return User.isTokenExpired(token);
}

async function login({ token, ...rest }: UserLogin): Promise<string | object> {
  // 如果用户存在则登录后返回token，否则新建用户并返回 {uid,token}
  let returnVal: string | object = '';

  const update = { $set: { logged: true } };

  if (token) {
    if (hasSessionExpired(token)) {
      throw new RouteError(
        HttpStatusCodes.UNAUTHORIZED,
        'User login has expired'
      );
    }
    await db.UserModel.findOneAndUpdate({ token }, update);
    returnVal = token;
  } else if (rest) {
    try {
      await db.UserModel.findOneAndUpdate(rest, update);
    } catch (error) {
      // 不存在则创建新用户
      returnVal = await addOne(rest);
    }
  }
  return returnVal;
}

async function logout(token: string): Promise<void> {
  await db.UserModel.updateOne({ token }, { $set: { logged: false } });
}

export default {
  login,
  logout,
  getAll,
  getOne,
  getRandom,
  addOne,
  updateOne,
  getProfile,
  hasSessionExpired,
};
