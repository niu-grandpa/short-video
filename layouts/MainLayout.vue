<template>
  <ALayout>
    <Header />
    <div class="h-[61px]" />
    <ALayout hasSider>
      <SideMain />
      <ContentMain>
        <slot />
      </ContentMain>
    </ALayout>
  </ALayout>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
