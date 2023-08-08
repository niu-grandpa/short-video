export const useDebounce = (fn: (...args: unknown[]) => any, delay: number) => {
  const fnRef = computed(() => fn);
  const timer = ref<NodeJS.Timeout | null>(null);

  const onClear = () => {
    clearTimeout(timer.value!);
    timer.value = null;
  };

  onBeforeUnmount(onClear);

  return (...args: unknown[]) => {
    if (timer.value) {
      onClear();
    }
    timer.value = setTimeout(() => {
      fnRef.value(...args);
      onClear();
    }, delay);
  };
};
