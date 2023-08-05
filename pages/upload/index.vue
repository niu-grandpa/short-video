<template>
  <UploadError :errorType="errorType" />

  <div
    v-if="isUploading"
    class="fixed flex items-center justify-center top-0 left-0 w-full h-screen bg-black z-50 bg-opacity-50">
    <Icon
      class="animate-spin ml-1"
      name="mingcute:loading-line"
      size="100"
      color="#FFFFFF" />
  </div>

  <UploadLayout>
    <section
      class="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:pl-[14rem] px-4">
      <div>
        <div class="text-[23px] font-semibold">视频上传</div>
        <div class="text-gray-400 mt-1">上传视频到你的个人中心</div>
      </div>

      <div class="mt-8 md:flex gap-6">
        <label
          v-if="!fileDisplay"
          for="fileInput"
          @click="onChooseVideo"
          @drop.prevent="onDrop"
          @dragover.prevent=""
          class="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
          <Icon name="majesticons:cloud-upload" size="40" color="#b3b3b1" />
          <div class="mt-4 text-[17px]">选择一个视频上传</div>
          <div class="mt-1.5 text-gray-500 text-[13px]">或者拖拽文件至此</div>
          <div class="mt-12 text-gray-400 text-sm">MP4</div>
          <div class="mt-2 text-gray-400 text-[13px]">时长不大于30分钟</div>
          <div class="mt-2 text-gray-400 text-[13px]">小于2GB</div>
          <div
            class="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm">
            选择文件
          </div>
          <input
            ref="fileInput"
            type="file"
            id="file"
            @input="onChange"
            hidden
            accept=".mp4" />
        </label>

        <div
          v-else
          class="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative">
          <div class="bg-black h-full w-full" />
          <img
            class="absolute z-20 pointer-events-none"
            src="~/assets/images/mobile-case.png" />
          <img
            class="absolute right-4 bottom-6 z-20"
            width="90"
            src="~/assets/images/tiktok-logo-white.png" />
          <video
            autoplay
            loop
            muted
            class="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
            :src="fileDisplay" />

          <div
            class="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300">
            <div class="flex items-center truncate">
              <Icon
                name="clarity:success-standard-line"
                size="16"
                class="min-w-[16px]" />
              <div class="text-[11px] pl-1 truncate text-ellipsis">
                {{ fileData.name }}
              </div>
            </div>
            <button
              @click="onClearVideo"
              class="text-[11px] ml-2 font-semibold">
              重新选择
            </button>
          </div>
        </div>

        <div class="mt-4 mb-6">
          <div class="flex bg-[#F8F8F8] py-4 px-6">
            <div>
              <Icon class="mr-4" size="20" name="mdi:box-cutter-off" />
            </div>
            <div>
              <div class="text-semibold text-[15px] mb-1.5">剪辑视频</div>
              <div class="text-semibold text-[13px] text-gray-400">
                您可以快速将视频分成多个部分，删除多余部分，将横向视频变成纵向视频
              </div>
            </div>
            <div
              class="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
              <button
                class="px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm">
                编辑
              </button>
            </div>
          </div>

          <div class="mt-5">
            <div class="flex items-center justify-between">
              <div class="mb-1 text-[15px]">标题</div>
              <div class="text-gray-400 text-[12px]">
                {{ caption.length }}/150
              </div>
            </div>
            <input
              v-model="caption"
              maxlength="150"
              type="text"
              class="w-full border p-2.5 rounded-md focus:outline-none" />
          </div>

          <div class="flex gap-3">
            <button
              @click="onDiscard"
              class="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm">
              重置
            </button>
            <button
              @click="onPostVideo"
              class="px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#F02C56] rounded-sm">
              上传
            </button>
          </div>

          <div v-if="errors" class="mt-4">
            <div class="text-red-600" v-if="errors && errors.video">
              {{ errors.video[0] }}
            </div>
            <div class="text-red-600" v-if="errors && errors.text">
              {{ errors.text[0] }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </UploadLayout>

  <UploadError :errorType="errorType" />
</template>

<script setup>
import { UploadLayout } from '~/layouts';

const { $userStore } = useNuxtApp();

const router = useRouter();

const fileInput = ref(null);
const fileDisplay = ref(null);
const errorType = ref('');
const caption = ref('');
const fileData = ref(null);
const errors = ref(null);
const isUploading = ref(false);

// 监听标题输入长度
watch(
  () => caption.value,
  caption => {
    if (caption.length >= 150) {
      errorType.value = 'caption';
      return;
    }
    errorType.value = '';
  }
);

// 转换上传的视频文件
const onChange = () => {
  fileDisplay.value = URL.createObjectURL(fileInput.value.files[0]);
  fileData.value = fileInput.value.files[0];
};

// 拖拽上传
const onDrop = e => {
  errorType.value = '';
  // 获取文件数据
  fileInput.value = e.dataTransfer.files[0];
  fileData.value = e.dataTransfer.files[0];
  // 获取文件后缀名
  const extension = fileInput.value.name.substring(
    fileInput.value.name.lastIndexOf('.') + 1
  );

  if (extension !== 'mp4') {
    errorType.value = 'fileInput';
    return;
  }
  // 创建url链接
  fileDisplay.value = URL.createObjectURL(fileData.value);
};

// 上传视频
const onPostVideo = async () => {
  errors.value = null;
  const data = new FormData();

  data.append('video', fileData.value || '');
  data.append('text', caption.value || '');

  if (fileData.value && caption.value) {
    isUploading.value = true;
  }

  try {
    const { status } = await $userStore.createPost(data);
    if (status === 200) {
      setTimeout(() => {
        router.push(`/profile/${$userStore.id}`);
        isUploading.value = false;
      }, 200);
    }
  } catch (error) {
    errors.value = error.response.data.errors;
    isUploading.value = false;
  }
};

const onDiscard = () => {
  fileInput.value = null;
  fileDisplay.value = null;
  fileData.value = null;
  caption.value = '';
};

const onClearVideo = () => {
  fileInput.value = null;
  fileDisplay.value = null;
  fileData.value = null;
  nextTick(onChooseVideo);
};

const onChooseVideo = () => {
  fileInput.value.click();
};
</script>
