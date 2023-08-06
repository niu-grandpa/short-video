<template>
  <TopNav />
  <section
    :class="route.fullPath === '/' ? 'max-w-[1140px]' : ''"
    class="flex mx-auto w-full lg:px-2.5 px-0">
    <SideNavMain />
    <section
      class="pt-[90px] 2xl:pl-[185px] lg:pl-[36px] lg:pr-0 pr-2 max-w-[1800px] 2xl:mx-auto">
      <slot />
    </section>
  </section>
</template>

<script setup>
const route = useRoute();
</script>
