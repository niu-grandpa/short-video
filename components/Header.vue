<template>
  <ALayoutHeader
    style="background-color: white"
    class="flex w-full h-[61px] fixed z-30 border-b">
    <nav
      class="max-w-[1340px] flex items-center justify-between w-full px-10 mx-auto">
      <NuxtLink to="/" class="lg:w-[20%] w-[70%]">
        <img width="115" src="~/assets/images/tiktok-logo.png" />
      </NuxtLink>
      <div class="hidden md:flex items-center max-w-[380px] w-full">
        <AInputSearch placeholder="搜索用户" size="large" />
      </div>
      <ASpace>
        <AButton
          size="large"
          class="flex items-center px-3 py-[6px]"
          style="height: 36px; padding: 0 22px">
          <VideoCameraAddOutlined class="text-[20px]" />
          上传
        </AButton>
        <AButton
          type="primary"
          size="large"
          danger
          style="height: 36px; padding: 0 22px"
          >登录
        </AButton>
      </ASpace>
    </nav>
  </ALayoutHeader>
</template>
