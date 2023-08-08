<template>
  <ALayout>
    <Header />
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
