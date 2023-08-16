import { useRequest } from '@/hooks';
import { AddUser, IUser, UpdateUser } from '@/server/src/models/User';

async function login(data: string): Promise<string>;
async function login(data: AddUser): Promise<string>;
async function login(_data: string | AddUser) {
  const data = typeof _data === 'string' ? { token: _data } : _data;
  return await useRequest<string>({
    methods: 'POST',
    url: '/users/login',
    data,
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

async function update(data: UpdateUser): Promise<void> {
  return await useRequest({
    methods: 'POST',
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

export default {
  login,
  getOne,
  getAll,
  update,
  profile,
} as const;
