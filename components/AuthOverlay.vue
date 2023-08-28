<template>
  <AModal
    :width="420"
    v-model:open="$generalStore.isLoginOpen"
    :maskClosable="false"
    destroyOnClose
    :footer="false"
    class="relative"
    @cancel="() => ($generalStore.isLoginOpen = false)"
    :confirm-loading="confirmLoading">
    <template #title>
      <ATypographyTitle :level="4" class="text-center">
        请先登录
      </ATypographyTitle>
    </template>
    <AForm
      ref="formRef"
      size="large"
      :rules="rules"
      layout="vertical"
      :model="formState"
      name="normal_login"
      @finish="onFinish">
      <AFormItem
        has-feedback
        class="mb-[12px]"
        label="手机号码"
        name="phoneNumber">
        <AInput
          v-model:value="formState.phoneNumber"
          placeholder="您的手机号码">
          <template #prefix>
            <MobileOutlined />
          </template>
        </AInput>
      </AFormItem>

      <AFormItem has-feedback label="验证码" class="mb-[6px]" name="code">
        <AInput
          :disabled="disabled"
          v-model:value="formState.code"
          autocomplete="off"
          placeholder="输入验证码">
          <template #prefix>
            <NumberOutlined />
          </template>
          <template #suffix>
            <AButton type="text" size="small" :disabled="disabled">
              获取验证码
            </AButton>
          </template>
        </AInput>
      </AFormItem>

      <AFormItem class="mb-[16px]">
        <AFormItem name="remember" no-style>
          <ACheckbox v-model:checked="formState.remember">自动登录</ACheckbox>
        </AFormItem>
      </AFormItem>

      <AFormItem>
        <AButton
          :disabled="disabled"
          :loading="confirmLoading"
          type="primary"
          html-type="submit"
          block>
          登录
        </AButton>
      </AFormItem>
    </AForm>

    <p class="text-center text-gray-500 text-[10px]">
      提示：如果用户不存在则登录即代表注册
    </p>
  </AModal>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { FormInstance, Rule } from 'ant-design-vue/es/form';
import { AddUser } from '~/services/types/user_api';

interface FormState {
  phoneNumber: string;
  code: string;
  remember: boolean;
}

const {
  $generalStore,
  $profileStore: { getProfile },
  $userStore: { login, getOne },
} = useNuxtApp();

const formRef = ref<FormInstance>();
const confirmLoading = ref(false);

const formState = reactive<FormState>({
  phoneNumber: '',
  code: '',
  remember: true,
});

const disabled = computed(() => !utils.testPhoneNumber(formState.phoneNumber));

const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('手机号码不能为空!');
  } else if (value !== '' && !utils.testPhoneNumber(value)) {
    return Promise.reject('请输入有效的手机号码');
  } else {
    return Promise.resolve();
  }
};
const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请输入验证码!');
  } else if (value.length < 6) {
    return Promise.reject('请输入6位验证码!');
  } else {
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  phoneNumber: [{ required: true, validator: validatePass }],
  code: [{ required: true, validator: validatePass2 }],
};

const onFinish = async ({
  phoneNumber,
  code,
  remember,
}: AddUser & { remember: boolean }) => {
  confirmLoading.value = true;
  try {
    await login({ phoneNumber, code });
    $generalStore.isLoginOpen = false;
    $generalStore.setAutoLogin(remember);
    message.success('欢迎回来~');
  } catch (error) {
    message.error('登录失败');
  } finally {
    confirmLoading.value = false;
  }
};
</script>
