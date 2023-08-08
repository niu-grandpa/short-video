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

- 负责首页模块：封装视频业务组件，实现滚动加载优化视频长列表性能

- 封装通用上传组件：用于头像和视频上传业务，实现点击和拖拽上传、图像裁剪、资源格式校验；处理资源为blob流url用于上传预览，包装为FormData格式用于上传服务器

- 负责个人模块：

- 负责直播模块：

## 遇到的问题

- 跨域问题

  - 使用nginx反向代理。下载nginx接着修改目录下，nginx.conf配置文件，在 location / 里面添加proxy_pass属性，设置前端的url，接着添加location /api/，在里面也添加proxy_pass属性，设置后端url，之后启动nginx服务即可解决

- Nuxt使用antd菜单组件会出现"document is not defined"

  - 因为组件内部依赖document对象，但在服务端渲染的时候没有document就会报错，解决办法是使用vue提供的 `<client-only>` 组件包裹，让它在客户端渲染

- 视频组件不应该在任何时候都自动播放

  - 使用浏览器 `IntersectionObserver` 方法，创建observe实例观察视频节点，通过方法的参数 `isIntersecting` 判断节点是否处于可视区域，如果是则自动播放，反之。

- 首页展示的视频稍微比较多的时候，页面就特别卡

  - xxxxxxxxxxxxxxxx

## 成果和收获
