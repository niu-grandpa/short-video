<template>
  <div
    id="AuthOverlay"
    class="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50">
    <div class="relative bg-white w-full max-w-[470px] h-[70%] p-4 rounded-lg">
      <div class="w-full flex justify-end">
        <button
          @click="$generalStore.isLoginOpen = false"
          class="p-1.5 rounded-full bg-gray-100">
          <Icon name="mdi:close" size="26" />
        </button>
      </div>

      <Login v-if="!isRegister" />
      <Register v-else />

      <div
        class="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
        <span class="text-[14px] text-gray-600"
          >{{ isRegister ? '已有账号' : '还未拥有账号' }}？</span
        >
        <button
          @click="isRegister = !isRegister"
          class="text-[14px] text-[#F02C56] font-semibold pl-1">
          <span v-if="isRegister">登录</span>
          <span v-else>注册</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $generalStore } = useNuxtApp();
const isRegister = ref(false);
</script>
