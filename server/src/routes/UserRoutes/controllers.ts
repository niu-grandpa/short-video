import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AddUser, UpdateUser } from '@src/models/User';
import UserService from '@src/services/UserService';
import { IReq, IReqQuery, IRes } from '../types/types';

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json({ data: users });
}

/**
 * Get one user.
 */
async function getOne(req: IReq, res: IRes) {
  const user = await UserService.getOne(req.headers.authorization!);
  return res.status(HttpStatusCodes.OK).json({ data: user });
}

/**
 * Update one user.
 */
async function update(req: IReq<{ data: UpdateUser }>, res: IRes) {
  await UserService.updateOne(req.headers.authorization!, req.body.data);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * User login.
 */
async function login(
  req: IReq<{ data: { token: string } & AddUser }>,
  res: IRes
) {
  const { data } = req.body;
  let _data;
  if (data?.token) {
    _data = data.token;
  } else {
    _data = data;
  }
  // @ts-ignore
  const uid = await UserService.login(_data);
  return res.status(HttpStatusCodes.OK).json({ data: uid });
}

/**
 * User logout.
 */
async function logout(req: IReq, res: IRes) {
  await UserService.logout(req.headers.authorization!);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * User profile.
 */
async function profile(req: IReqQuery<{ uid: string }>, res: IRes) {
  const f = req.query?.uid ?? req.headers.authorization;
  const data = await UserService.getProfile(f);
  return res.status(HttpStatusCodes.OK).json({ data });
}

export default {
  getAll,
  getOne,
  update,
  login,
  logout,
  profile,
} as const;
