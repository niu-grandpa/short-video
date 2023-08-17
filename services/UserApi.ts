import { useRequest } from '@/hooks';
import { AddUser, IUser } from '@/server/src/models/User';

async function login(data: string): Promise<string>;
async function login(data: AddUser): Promise<string>;
async function login(_data: string | AddUser): Promise<string> {
  const data = typeof _data === 'string' ? { token: _data } : _data;
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
    methods: 'PUT',
    url: '/users/profile',
    data: { uid },
  });
}

async function isExpired(): Promise<boolean> {
  return await useRequest<boolean>({
    url: '/users/profile',
  });
}

export default {
  login,
  logout,
  getOne,
  getAll,
  update,
  profile,
  isExpired,
} as const;
