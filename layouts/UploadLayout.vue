<template>
  <main class="bg-[#F8F8F8] h-[100vh]">
    <Header />
    <section class="flex justify-between mx-auto w-full px-2 max-w-[1140px]">
      <slot />
    </section>
  </main>
</template>

<script setup>
const route = useRoute();
</script>
