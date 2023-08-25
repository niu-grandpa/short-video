import axios from 'axios';
import { useGeneralStore } from '~/stores/general';
import { useUserStore } from '~/stores/user';

type UseRequest = {
  methods?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: object;
  timeout?: number;
};

export const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '';

const basePath = '/api';

export function useRequest<T>(config: UseRequest): Promise<T> {
  const userStore = useUserStore();
  const generalStore = useGeneralStore();

  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: config.timeout ?? 5000,
  });

  // 添加请求拦截器
  instance.interceptors.request.use(config => {
    config.headers.Authorization = userStore.token;
    return config;
  });

  // 响应拦截
  instance.interceptors.response.use(
    v => v,
    error => {
      const {
        response: { status },
      } = error;
      switch (status) {
        case 401: // 无权限
        case 502: // Bad Gateway
        case 503: // 服务器问题
          generalStore.restAll();
          location.href !== '/' && (location.href = '/');
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

  const obj =
    method === 'get' ? { params: config.data } : { data: config.data };

  return new Promise((resolve, reject) => {
    // @ts-ignore
    instance[method](basePath + config.url, obj)
      .then((res: { data: T | PromiseLike<T> }) => resolve(res.data))
      .catch(reject);
  });
}
