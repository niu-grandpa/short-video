<template>
  <div ref="container" class="h-[100vh] overflow-y-auto">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useSrcollLoading } from '~/hooks';

interface Props {
  delay: number;
  reload?: boolean;
  loop: boolean;
  immediately: boolean;
  request: {
    url: string;
    sort?: -1 | 1;
  };
}

const emit = defineEmits(['loadMore']);

const props = defineProps<Partial<Props>>();

const container = ref<HTMLElement | null>(null);

const loadData = (url = props.request?.url) => {
  useSrcollLoading(container.value!, data => emit('loadMore', data), {
    ...props,
    request: {
      url,
      page: 0,
      size: 10,
    },
    immediately: true,
  });
};

onMounted(loadData);

watch(
  () => [props.reload, props.request?.url],
  ([newVal1, newVal2]) => {
    if (newVal1) loadData();
    if (newVal2) loadData(newVal2 as string);
  }
);
</script>
