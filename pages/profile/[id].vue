<template>
  <Head>
    <title>short-video 个人空间</title>
  </Head>

  <MainLayout>
    <ACard class="w-[95%] m-auto border-0">
      <ARow>
        <ACol :span="2" class="text-center">
          <AAvatar :size="64" class="cursor-pointer" />
        </ACol>
        <ACol :span="22">
          <ATypographyTitle :level="3">用户名</ATypographyTitle>
          <div class="flex w-full items-center justify-between">
            <AInput
              placeholder="编辑个性签名"
              class="w-[60%] ml-[-8px] border-0 hover:border" />
            <AButton vif="true" class="flex items-center">
              <EditOutlined />编辑个人信息
            </AButton>
            <!-- <ASpace v-else>
              <AButton type="primary" danger class="px-[24px]">关注</AButton>
              <AButton>发消息</AButton>
            </ASpace> -->
          </div>
        </ACol>
      </ARow>
      <ARow class="mt-[14px]">
        <ACol :span="3"><strong>10K</strong> 已关注</ACol>
        <ACol :span="3"><strong>44K</strong> 我的关注</ACol>
        <ACol><strong>0</strong> 收藏</ACol>
      </ARow>
    </ACard>

    <section class="w-[95%] m-auto">
      <ClientOnly>
        <ATabs v-model:activeKey="activeKey" size="large">
          <ATabPane key="1">
            <template #tab>
              <p class="w-[180px] text-center">视频</p>
            </template>
            Content of Tab Pane 1
          </ATabPane>
          <ATabPane key="2" force-render>
            <template #tab>
              <div
                class="w-[180px] text-center flex items-center justify-center">
                <LockFilled />已收藏
              </div>
            </template>
            Content of Tab Pane 2
          </ATabPane>
        </ATabs>
      </ClientOnly>
    </section>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';

const route = useRoute();

const activeKey = ref('1');

// definePageMeta({ middleware: 'auth' });
</script>
