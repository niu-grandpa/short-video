<template>
  <AAvatar
    :src="$profileStore.icon"
    size="large"
    class="ml-[8px] mb-[1px] flex items-center justify-center">
    <template #icon><UserOutlined /></template>
  </AAvatar>
</template>
