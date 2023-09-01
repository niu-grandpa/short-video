<template>
  <Head>
    <title>short-video 上传视频</title>
  </Head>
  <UploadLayout>
    <section
      class="w-full my-[24px] bg-white shadow-lg rounded-md py-6 md:pl-[14rem] px-4">
      <section>
        <ATypographyTitle :level="2">视频上传</ATypographyTitle>
        <p class="text-gray-400 mt-1">上传视频到个人主页</p>
      </section>

      <ARow>
        <ACol :span="6">
          <div
            v-show="!videoURL"
            class="md:mx-0 mx-auto mt-4 mb-6 w-full max-w-[260px] h-[470px] text-center">
            <AUploadDragger
              :maxCount="1"
              v-model:fileList="fileList"
              supportServerRender
              accept=".mp4"
              @reject="onReject"
              :before-upload="onBeforeUpload">
              <CloudUploadOutlined
                class="pt-[72px] text-[40px] text-[#b3b3b1]" />
              <p class="mt-4 text-[17px]">选择一个视频上传</p>
              <p class="mt-1.5 text-gray-500 text-[13px]">或者拖拽文件至此</p>
              <p class="mt-12 text-gray-400 text-sm">MP4格式</p>
              <p class="mt-2 text-gray-400 text-[13px]">时长不大于30分钟</p>
              <p class="mt-2 text-gray-400 text-[13px]">小于200MB</p>
              <AButton type="primary" danger class="w-[80%] mt-8">
                选择文件
              </AButton>
            </AUploadDragger>
          </div>

          <section
            v-show="videoURL"
            class="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative">
            <div class="bg-black h-full w-full" />
            <img
              class="absolute z-20 pointer-events-none"
              src="~/assets/images/mobile-case.png" />

            <video
              loop
              muted
              autoplay
              ref="videoRef"
              class="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full" />

            <div
              class="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300">
              <div class="flex items-center truncate">
                <a
                  name="clarity:success-standard-line"
                  size="16"
                  class="min-w-[16px]" />
                <div class="text-[11px] pl-1 truncate text-ellipsis">
                  {{ filename }}
                </div>
              </div>
              <button
                @click="onChooseFile"
                class="text-[11px] ml-2 font-semibold">
                重新选择
              </button>
            </div>
          </section>
        </ACol>

        <ACol>
          <section class="mt-4 mb-6">
            <ul class="flex bg-[#F8F8F8] py-4 px-6">
              <li>
                <a class="mr-4" size="20" name="mdi:box-cutter-off" />
              </li>
              <li>
                <p><ATypographyText>剪辑视频</ATypographyText></p>
                <ATypographyText type="secondary">
                  您可以快速将视频分成多个部分，删除多余部分，将横向视频变成纵向视频
                </ATypographyText>
              </li>
              <li
                class="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                <AButton type="primary" danger>编辑</AButton>
              </li>
            </ul>

            <section class="mt-5 mb-[68px]">
              <div class="flex items-center justify-between mb-[8px]">
                <ATypographyText>标题</ATypographyText>
              </div>
              <AInput
                v-model:value="caption"
                size="large"
                show-count
                :maxlength="80" />
            </section>

            <ASpace>
              <AButton
                type="primary"
                size="large"
                @click="onReset"
                class="w-[120px]">
                重置
              </AButton>
              <AButton
                :loading="isUploading"
                class="w-[120px]"
                size="large"
                @click="onPostVideo">
                上传
              </AButton>
            </ASpace>
          </section>
        </ACol>
      </ARow>
    </section>
  </UploadLayout>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { FileType } from 'ant-design-vue/es/upload/interface';
import { UploadLayout } from '~/layouts';

definePageMeta({ middleware: 'auth' });

const { $userStore, $generalStore } = useNuxtApp();

const router = useRouter();

// 代表200MB，单位bt
const maxSize = 209715200;
// 30分钟，单位秒
const maxDuration = 1800;

const caption = ref('');
const isUploading = ref(false);

const inputRef = ref<HTMLSpanElement | null>(null);
const videoRef = ref<HTMLVideoElement | null>(null);

const videoURL = ref('');
const filename = ref('');
const fileBlob = ref<Blob | null>(null);
const fileList = ref<FileType[]>([]);

onMounted(() => {
  inputRef.value = document.querySelector('.ant-upload-btn');
});

watch(
  () => videoURL.value,
  newVal => {
    videoRef.value!.src = newVal;
    videoRef.value!.onloadeddata = e => {
      // @ts-ignore
      if (~~e.target.duration > maxDuration) {
        onReset();
        message.error('视频时长不能超过30分钟');
      }
    };
  }
);

const onBeforeUpload = (file: FileType) => {
  if (file.size > maxSize) {
    message.error('视频大小超出限制');
    return false;
  }
  return new Promise((_, reject) => {
    videoURL.value = URL.createObjectURL(file);
    reject();
  });
};

// 处理上传数据格式
const handleFormData = () => {
  const data = new FormData();
  data.append('video', fileBlob.value!);
  data.append('caption', caption.value);
  return data;
};

// 上传视频
const onPostVideo = async () => {
  if (!fileBlob.value) {
    message.error('请上传视频');
    return;
  }
  if (!caption.value) {
    message.error('请输入标题');
    return;
  }

  isUploading.value = true;

  // TODO
  handleFormData();

  message.success('上传成功');

  setTimeout(() => {
    onReset();
    router.push(`/profile/${1}`);
  }, 200);
};

const onReject = () => {
  message.error('请上传mp4格式');
};

const onReset = () => {
  caption.value = '';
  videoURL.value = '';
  fileBlob.value = null;
  fileList.value.length = 0;
  isUploading.value = false;
};

const onChooseFile = () => {
  onReset();
  inputRef.value?.click();
};
</script>
