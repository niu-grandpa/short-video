<template>
  <div ref="container" class="h-[100vh] overflow-y-auto">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useSrcollLoading } from '~/hooks';

interface Props {
  delay: number;
  loop: boolean;
  immediately: boolean;
  request: {
    url?: string;
    page: number;
    size: number;
    sort?: -1 | 1;
    onlyFromList?: unknown[];
    error?: () => void;
  };
}

const emit = defineEmits(['loadMore']);

const props = defineProps<Partial<Props>>();

const container = ref<HTMLElement | null>(null);

onMounted(() => {
  useSrcollLoading(container.value!, data => emit('loadMore', data), {
    ...props,
    immediately: true,
  });
});
</script>
