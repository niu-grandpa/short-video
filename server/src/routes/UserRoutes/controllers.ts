import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IUser, UserLogin } from '@src/models/User';
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
async function getOne(req: IReqQuery<{}>, res: IRes) {
  const user = await UserService.getOne(req.headers.authorization!);
  return res.status(HttpStatusCodes.OK).json({ data: user });
}

/**
 * Update one user.
 */
async function update(req: IReq<IUser>, res: IRes) {
  await UserService.updateOne(req.headers.authorization!, req.body);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * User login.
 */
async function login(req: IReq<UserLogin>, res: IRes) {
  const { token, ...rest } = req.body;
  // @ts-ignore
  const uid = await UserService.login(token ?? rest);
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

function sessionExpired(req: IReqQuery<{}>, res: IRes) {
  const flag = UserService.hasSessionExpired(req.headers.authorization!);
  return res.status(HttpStatusCodes[flag ? 'UNAUTHORIZED' : 'OK']).end();
}

export default {
  getAll,
  getOne,
  update,
  login,
  logout,
  profile,
  sessionExpired,
} as const;
