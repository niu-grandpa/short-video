import { useDebounce } from './useDebounce';
import { useRequest } from './useRequest';

export type UseSrcollLoadingOptions<T = unknown> = Partial<{
  delay: number;
  loop: boolean;
  reload: boolean;
  maxHeight: string;
  immediately: boolean;
  request: {
    url?: string;
    page: number;
    size: number;
    sort?: -1 | 1;
    onlyFromList?: T[];
    error?: () => void;
  };
}>;

const defaultOptions = {
  delay: 200,
  reload: false,
  maxHeight: '100vh',
  immediately: false,
  request: {
    url: '',
    page: 1,
    size: 10,
    error: void 0,
    sort: void 0,
    onlyFromList: void 0,
  },
};

export const useSrcollLoading = <T = unknown>(
  el: HTMLElement,
  hook: (data: T[]) => void,
  options: UseSrcollLoadingOptions<T> = defaultOptions
) => {
  const opts = { ...defaultOptions, ...options };
  const { url, size, sort, error, onlyFromList } = opts.request;

  const total = [];
  const containerH = el.offsetHeight;

  let hasMore = true,
    temp: T[] = [],
    { page } = opts.request,
    startPos = page;

  const loadMore = async () => {
    if (!url && !onlyFromList) {
      printf(
        'error',
        'You must add <url> or <onlyFromList> props for loading data'
      );
      return;
    }
    if (onlyFromList?.length) {
      if (total.length >= onlyFromList.length) {
        hasMore = false;
        printf('info', 'all loaded!');
      } else {
        const endPos = startPos + size;
        temp = onlyFromList.slice(startPos, endPos);
        total.push(...temp);
        startPos = endPos;
      }
    } else if (url) {
      try {
        temp = await useRequest<T[]>({
          url: url!,
          data: { page, size, sort },
        });
        if (!temp.length) {
          printf('info', 'all requests completed!');
        }
        hasMore = temp.length !== 0;
      } catch (err) {
        error?.();
        printf('error', `${err}`);
      }
    }

    hook?.(temp);
  };

  const onScroll = useDebounce(() => {
    const { scrollTop, scrollHeight } = el;
    if (~~(scrollTop + containerH) >= scrollHeight) {
      if (hasMore) {
        page++;
        loadMore();
      }
    }
  }, opts.delay);

  if (opts.immediately || opts.reload) loadMore();
  el.addEventListener('scroll', onScroll);
};

const printf = (type: 'info' | 'error', msg: string) => {
  console[type](`[SrcollLoading ${type}]: ${msg}`);
};
