import { useRequest } from '@/hooks';
import { IUser, UserLogin } from './types/user_api';

export interface LoginResult {
  uid: string;
  token: string;
}

async function login(data: UserLogin): Promise<LoginResult | string> {
  return await useRequest<string>({
    methods: 'POST',
    url: '/users/login',
    data,
  });
}

async function logout(): Promise<void> {
  return await useRequest({
    url: '/users/logout',
  });
}

async function getOne(): Promise<IUser> {
  return await useRequest<IUser>({
    url: '/users/one',
  });
}

async function getAll(): Promise<IUser[]> {
  return await useRequest<IUser[]>({
    url: '/users/all',
  });
}

async function update(data: IUser): Promise<void> {
  return await useRequest({
    methods: 'PUT',
    url: '/users/update',
    data,
  });
}

async function profile(uid?: string): Promise<IUser> {
  return await useRequest<IUser>({
    url: '/users/profile',
    data: { uid },
  });
}

async function isExpired(): Promise<boolean> {
  return await useRequest<boolean>({
    url: '/users/has-session-expired',
  });
}

async function recommend(): Promise<IUser[]> {
  return await useRequest<IUser[]>({
    url: '/users/recommend',
  });
}

export default {
  login,
  logout,
  getOne,
  getAll,
  update,
  profile,
  recommend,
  isExpired,
} as const;
