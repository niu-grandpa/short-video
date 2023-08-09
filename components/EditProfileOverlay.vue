<template>
  <ClientOnly>
    <AModal
      title="编辑个人信息"
      destroyOnClose
      :footer="null"
      :maskClosable="false"
      v-model:open="$generalStore.isEditOpen"
      @cancel="() => ($generalStore.isEditOpen = false)">
    </AModal>
  </ClientOnly>
</template>

<script setup lang="ts">
const { $userStore, $generalStore } = useNuxtApp();
</script>
