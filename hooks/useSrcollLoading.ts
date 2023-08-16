import { useDebounce } from './useDebounce';
import { useRequest } from './useRequest';

type UseSrcollLoadingOptions<T> = Partial<{
  delay: number;
  loop: boolean;
  maxHeight: string;
  immediately: boolean;
  request: {
    url?: string;
    page: number;
    size: number;
    sort?: string;
    onlyFromList?: T[];
    error?: () => void;
  };
}>;

const defaultOptions = {
  delay: 200,
  maxHeight: '100vh',
  immediately: false,
  request: {
    url: '',
    page: 1,
    size: 10,
    sort: '',
    error: void 0,
    onlyFromList: void 0,
  },
};

export const useSrcollLoading = <T = unknown>(
  el: HTMLElement,
  hook: (data: T[]) => void,
  options: UseSrcollLoadingOptions<T> = defaultOptions
) => {
  const elHeight = el.offsetHeight;
  const opts = { ...defaultOptions, ...options };
  const hasMore = ref(false);

  let res: T[] = [],
    { url, page, size, sort, error, onlyFromList } = opts.request,
    startPos = page === 1 ? 0 : page;

  el.style.height = opts.maxHeight;
  el.style.overflowY = 'auto';

  const requsetData = async () => {
    try {
      const data = await useRequest<T[]>({
        url: url!,
        data: {
          page: page!++,
          size,
          sort,
        },
      });
      return data;
    } catch (err) {
      error?.();
      printf('error', `${err}`);
    }
  };

  const loadMore = async () => {
    if (!url && !onlyFromList) {
      printf(
        'error',
        'You must add <url> or <onlyFromList> props for loading data'
      );
      return;
    }
    if (onlyFromList?.length) {
      if (res.length >= onlyFromList.length) {
        hasMore.value = false;
        printf('info', 'all loaded!');
      } else {
        hasMore.value = true;
        const endPos = startPos + size;
        res = onlyFromList.slice(startPos, endPos);
        startPos = endPos;
      }
    } else if (url) {
      hasMore.value = true;
      res = (await requsetData()) as T[];
      if (!res.length) {
        hasMore.value = false;
        printf('info', 'all requests completed!');
      }
    }
    hook?.(res);
  };

  const onScroll = useDebounce(() => {
    const { scrollTop, scrollHeight } = el;
    if (~~(scrollTop + elHeight) >= scrollHeight) {
      loadMore();
    }
  }, opts.delay);

  if (opts.immediately) loadMore();

  watchEffect(() => {
    if (!hasMore.value) {
      el.removeEventListener('scroll', onScroll);
    } else {
      el.addEventListener('scroll', onScroll);
    }
  });

  onBeforeUnmount(() => {
    el.removeEventListener('scroll', onScroll);
  });
};

const printf = (type: 'info' | 'error', msg: string) => {
  console[type](`[SrcollLoading ${type}]: ${msg}`);
};
