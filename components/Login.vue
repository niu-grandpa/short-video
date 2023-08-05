<template>
  <div class="text-center text-[28px] mb-4 font-bold">用户登录</div>

  <div class="px-6 pb-1.5 text-[15px]" />

  <div class="px-6 pb-2">
    <TextInput
      placeholder="邮箱"
      @change="val => (email = val)"
      inputType="email"
      :autoFocus="true"
      :error="errors && errors.email ? errors.email[0] : ''" />
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="密码"
      @change="val => (password = val)"
      inputType="password" />
  </div>
  <div class="px-6 text-[12px] text-gray-600">忘记密码？</div>

  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!email || !password"
      :class="!email || !password ? 'bg-gray-200' : 'bg-[#F02C56]'"
      @click="onLogin"
      class="w-full text-[17px] font-semibold text-white py-3 rounded-sm">
      登录
    </button>
  </div>
</template>

<script setup>
const { $userStore, $generalStore } = useNuxtApp();

const email = ref(null);
const password = ref(null);
const errors = ref(null);

const onLogin = async () => {
  errors.value = null;
  try {
    await $userStore.getTokens();
    await $userStore.login(email.value, password.value);
    await $userStore.getUser();
    await $generalStore.getRandomUsers('suggested');
    await $generalStore.getRandomUsers('following');
    $generalStore.isLoginOpen = false;
  } catch (error) {
    errors.value = error.response.data.errors;
  }
};
</script>
