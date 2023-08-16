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
      noExternal: [
        'moment',
        'compute-scroll-into-view',
        'ant-design-vue',
        '@ant-design/icons-vue',
      ],
    },
  },
});
