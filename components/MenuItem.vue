<template>
  <div class="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md">
    <div class="flex items-center lg:mx-0 mx-auto">
      <Icon :name="iconName" :color="color" :size="size" />
      <span
        :class="`text-[${color}]`"
        class="lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px]">
        {{ title }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['icon', 'title', 'color', 'size']);
const { title, icon, color, size } = toRefs(props);

const iconName = ref('');

icon.value === 'For You' && (iconName.value = 'mdi:home');
icon.value === 'Following' && (iconName.value = 'ci:group');
icon.value === 'LIVE' && (iconName.value = 'ri:live-line');
</script>
