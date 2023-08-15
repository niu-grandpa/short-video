import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AddUser, UpdateUser } from '@src/models/User';
import UserService from '@src/services/UserService';
import { IReq, IReqQuery, IRes } from '../types/types';

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Get one user.
 */
async function getOne(req: IReqQuery<{ id: string }>, res: IRes) {
  const { id } = req.query;
  const user = await UserService.getById(id);
  return res.status(HttpStatusCodes.OK).json({ user });
}

/**
 * Update one user.
 */
async function update(
  req: IReq<{ data: { uid: string } & UpdateUser }>,
  res: IRes
) {
  const { uid, ...obj } = req.body.data;
  await UserService.updateOne(uid, obj);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * User login.
 */
async function login(req: IReq<{ data: string | AddUser }>, res: IRes) {
  const { data } = req.body;
  // @ts-ignore
  const uid = await UserService.login(data);
  return res.status(HttpStatusCodes.OK).json(uid);
}

/**
 * User logout.
 */
async function logout(req: IReq<{ data: string }>, res: IRes) {
  const { data } = req.body;
  await UserService.logout(data);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  getAll,
  getOne,
  update,
  login,
  logout,
} as const;
