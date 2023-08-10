# Short Video (short-video)

## 简介

一个短视频点播平台

nuxt：无需配置路由-无需导入模块直接使用
pinia：vuex替代品-轻量级-使用方便
部署上线后，页面刷新没有404的问题

## 我的职责

- 搭建前后端与数据库，编写模块和接口，业务组件开发，抽离页面通用布局，postman测试接口

- 构建应用数据流，使用pinia定义general、profile、user数据流模块，定义全局状态和数据请求等同异步行为

- 负责权限模块：封装登录组件利用ant-form校验数据，实现登录注册一体化；编写和注入路由权限中间件，防止页面非法跳转；axios拦截响应针对特定状态码检查权限状态，重定向登录

- 负责首页模块：抽离页面通用布局，封装视频组件、滚动加载组件，实现视频长列表滚动加载优化，提升性能

- 负责上传模块：封装视频上传组件，校验格式和大小，利用canvas添加水印并转为blob流数据，转为本地url预览，处理blob数据为formData格式上传云端

- 负责视频详情模块：

- 负责直播模块：

## 遇到的问题

- 跨域问题

  - 使用nginx反向代理。下载nginx接着修改目录下，nginx.conf配置文件，在 location / 里面添加proxy_pass属性，设置前端的url，接着添加location /api/，在里面也添加proxy_pass属性，设置后端url，之后启动nginx服务即可解决

- Nuxt使用antd菜单组件会出现"document is not defined"

  - 因为组件内部依赖document对象，但在服务端渲染的时候没有document就会报错，解决办法是使用vue提供的 `<client-only>` 组件包裹，让它在客户端渲染

- 如何添加视频水印

  - xxxx

## 成果和收获
