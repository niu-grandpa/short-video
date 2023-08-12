<template>
  <section ref="container">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { useSrcollLoading } from '~/hooks';

const emit = defineEmits(['loadMore']);
const props = defineProps<{}>();

const container = ref<HTMLElement | null>(null);

onMounted(() => {
  useSrcollLoading(container.value!, data => emit('loadMore', data), {
    immediately: true,
  });
});
</script>
