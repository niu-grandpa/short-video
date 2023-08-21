import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    // 按需加载antd，提高编译速度、打包后的体积
    plugins: [
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less',
            resolveIcons: true,
          }),
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    ssr: {
      // 排除要ssr的模块，提高渲染速度
      noExternal: [
        'moment',
        'compute-scroll-into-view',
        'ant-design-vue',
        '@ant-design/icons-vue',
      ],
    },
  },
});
