<template>
  <TopNav />
  <section
    :class="route.pathname === '/' ? 'max-w-[1140px]' : ''"
    class="flex mx-auto w-full lg:px-2.5 px-0">
    <SideNavMain />
    <slot />
  </section>
</template>

<script setup>
const route = useRoute();
</script>
