<template>
  <input
    :id="`input-${placeholder}`"
    :placeholder="placeholder"
    class="block w-full bg-[#F1F1F2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
    :type="inputType"
    v-model="inputVal"
    autocomplete="off"
    :maxlength="max" />
  <span v-if="error" class="text-red-500 text-[14px] font-semibold">
    {{ error }}
  </span>
</template>

<script setup>
const emit = defineEmits(['change']);

const props = defineProps([
  'placeholder',
  'inputType',
  'max',
  'autoFocus',
  'error',
]);
const { placeholder, inputType, max, autoFocus, error } = toRefs(props);

const inputVal = ref('');

onMounted(() => {
  if (autoFocus.value) {
    document.getElementById(`input-${placeholder.value}`).focus();
  }
});

watch(
  () => inputVal.value,
  (newVal, oldVal) => {
    // 优化：输入框的值与上一次的内容不一样时，才执行change事件
    if (newVal !== oldVal) {
      emit('change', inputVal.value);
    }
  }
);
</script>
