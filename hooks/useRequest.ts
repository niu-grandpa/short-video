import axios from 'axios';
import { useGeneralStore } from '~/stores/general';
import { useProfileStore } from '~/stores/profile';
import { useUserStore } from '~/stores/user';

type UseRequest = {
  methods?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: object;
  timeout?: number;
};

const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '';

const basePath = '/api';

export function useRequest<T>(config: UseRequest): Promise<T> {
  const userStore = useUserStore();
  const profileStore = useProfileStore();
  const generalStore = useGeneralStore();

  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: config.timeout ?? 5000,
  });

  // 添加请求拦截器
  instance.interceptors.request.use(
    config => {
      config.headers.Authorization = localStorage.getItem('user_token');
      return config;
    },
    error => {
      switch (error) {
        case 401: // 无权限
        case 429: // 重复登录
        case 503: // 服务器问题
          userStore.restData();
          profileStore.restData();
          generalStore.restData();
          window.location.href = '/';
          break;
        case 500:
          alert('Oh! 服务器出了一些问题');
          break;
        default:
          return Promise.reject(error);
      }
    }
  );

  const method = (config.methods ?? 'GET').toLowerCase();
  const sendData =
    method === 'get' ? { params: config.data } : { data: config.data };

  return new Promise((resolve, reject) => {
    // @ts-ignore
    instance[method](basePath + config.url, sendData)
      .then((res: { data: T | PromiseLike<T> }) => resolve(res.data))
      .catch(reject);
  });
}
