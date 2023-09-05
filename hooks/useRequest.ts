import axios from 'axios';
import SERVER_URL from '~/services/URL';
import { useGeneralStore } from '~/stores/general';
import { useUserStore } from '~/stores/user';

type UseRequest = {
  methods?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: object;
  timeout?: number;
  contentType?: string;
};

type ApiReturnType<T> = {
  data: { data: T };
};

export const baseURL =
  process.env.NODE_ENV === 'development' ? SERVER_URL.dev : SERVER_URL.prod;

export function useRequest<T>(cfg: UseRequest): Promise<T> {
  const generalStore = useGeneralStore();

  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: cfg.timeout ?? 5000,
  });

  // 添加请求拦截器
  instance.interceptors.request.use(config => {
    if (cfg.contentType) {
      config.headers['Content-Type'] = cfg.contentType;
    }
    config.headers.Authorization = useUserStore().token;
    return config;
  });

  // 响应拦截
  instance.interceptors.response.use(
    v => v,
    error => {
      const { response } = error;
      if (response?.status) {
        switch (response.response) {
          case 401: // 无权限
            alert('用户无权限');
          case 502: // Bad Gateway
            alert('服务器网关错误');
          case 503: // 服务器问题
            generalStore.restAll();
            useRouter().replace('/');
          case 500:
            alert('Oh! 服务器出了一些问题');
            break;
          default:
            return Promise.reject(error);
        }
      }
    }
  );

  const { url, methods, data, contentType } = cfg;
  const _methods = (methods ?? 'GET').toLowerCase();

  let carry = {};
  if (contentType === 'multipart/form-data') {
    carry = data!;
  } else if (_methods === 'get' || _methods === 'delete') {
    carry = { params: data };
  } else {
    carry = { data: data };
  }

  return new Promise((resolve, reject) => {
    // @ts-ignore
    instance[_methods](`/api${url}`, carry)
      .then((res: ApiReturnType<T>) => {
        if (res?.data?.data) {
          resolve(res.data.data);
        } else {
          resolve([] as any);
        }
      })
      .catch(reject);
  });
}
