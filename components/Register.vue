<template>
  <div class="text-center text-[28px] mb-4 font-bold">新用户注册</div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="昵称"
      @change="val => (name = val)"
      inputType="text"
      :autoFocus="true"
      :error="errors && errors.name ? errors.name[0] : ''" />
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="邮箱地址"
      @change="val => (email = val)"
      inputType="email"
      :error="errors && errors.email ? errors.email[0] : ''" />
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="密码"
      @change="val => (password = val)"
      inputType="password"
      :error="errors && errors.password ? errors.password[0] : ''" />
  </div>

  <div class="px-6 pb-2">
    <TextInput
      placeholder="确认密码"
      @change="val => (confirmPassword = val)"
      inputType="password"
      :error="
        errors && errors.confirmPassword ? errors.confirmPassword[0] : ''
      " />
  </div>
  <div class="px-6 text-[12px] text-gray-600">找回密码</div>

  <div class="px-6 pb-2 mt-6">
    <button
      :disabled="!name || !email || !password || !confirmPassword"
      :class="
        !name || !email || !password || !confirmPassword
          ? 'bg-gray-200'
          : 'bg-[#F02C56]'
      "
      @click="onRegister"
      class="w-full text-[17px] font-semibold text-white bg-[#F02C56] py-3 rounded-sm">
      注册
    </button>
  </div>
</template>

<script setup>
const { $userStore, $generalStore } = useNuxtApp();

const name = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errors = ref(null);

const onRegister = async () => {
  errors.value = null;
  try {
    await $userStore.getTokens();
    await $userStore.register(
      name.value,
      email.value,
      password.value,
      confirmPassword.value
    );
    await $userStore.getUser();
    await $generalStore.getRandomUsers('suggested');
    await $generalStore.getRandomUsers('following');
    $generalStore.isLoginOpen = false;
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  }
};
</script>
