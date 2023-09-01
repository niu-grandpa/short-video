# Short Video (short-video)

> 后端项目地址: <https://github.com/niu-grandpa/short-video-api>

## 简介

一个刷短视频的web平台，参考tiktok

技术栈：

nuxtjs：服务端渲染利于seo、无首页白屏问题，无需配置路由无需导入模块直接使用，允许使用nodejs模块，部署上线后没有404问题

pinia：vuex替代品-轻量级-使用方便-心智负担低

vue3：

typescript：

antd：

tailwindcss：

## 我的职责

- 使用vercel实现CI/CD部署前端，在linux云服务器git+nginx方式部署和代理后端

- 构建应用数据流：使用pinia创建general、profile、user数据流模块，用于持久化存储应用数据、定义数据请求和通用行为等

- 开启页面keepalive优化，抽离页面公共布局，封装业务组件和通用hooks：防抖、滚动加载、数据请求、事件触发鉴权等

- 实现用户鉴权：实现路由中间件判断登录态和其他权限，防止越权跳转；实现axios拦截器对请求头注入token确保有权请求、对响应码401 502 503 作重定向登录

- 封装公用视频组件：利用上传视频时通过canvas生成的视频avif图、海报图，结合picture元素制作伪视频，避免加载真正的视频文件，优化体验和页面加载时间

- 负责视频页：使用video标签预加载技术，提前请求和缓存视频文件优化加载时间；根据网络状况实现动态调整视频缓冲策略，优化播放体验

- 负责评论模块：对数据添加level标记和belong字段，用于辨别评论层级（至多2层）与所属源；优化父子数据存储分离，打平结构嵌套，避免前端要递归生成评论组件的问题；使用滚动加载技术优化长列表渲染；实现子评论数据懒加载

- 负责个人页：实现游客访问权限设置、视频权限可见范围设置，个人信息修改同步到profile数据流和数据库

- 针对nuxt构建包体过大，通过按需引入ant-vue组件，对rollup构建项优化：配置manualChunks对模块最小化拆分包、使用compression、terser、imagemin插件，对文件开启gzip压缩、去除debugger、图片压缩；优化后包体减少1000kb

- 负责对网站进行seo优化，使用useHead钩子在路由组件内定义seo相关属性、对于路由跳转采用打开新页面的方式，让搜索引擎更易理解和处理

## 遇到的问题

- 跨域问题

  - 1.在后端响应头中添加 `Access-Control-Allow-Origin` 字段，指定允许访问的域名

- Nuxt使用antd菜单组件会出现"document is not defined"

  - 因为组件内部依赖document对象，但在服务端渲染的时候没有document就会报错，解决办法是使用vue提供的 `<client-only>` 组件包裹，让它在客户端渲染

- 如何在axios中统一给请求带上token

  - 使用axios的拦截器在发送请求前，将token添加到请求头中。(headers.Authorization)

- 哪种请求方式该将数据放在请求体中，后端是使用request.query还是body接收

  - 当Get和Delete请求通常是使用URL传参，不放在请求体中，后端通过req.query专门接收来自这两种请求方式的参数

  - Post和Put请求将数据放在请求体中，后端使用中间件body-parser解析请求体数据，通过req.body接收

- 如何实现获取随机用户和随机视频

  - 通过使用 MongoDB 的 `aggregate()` 方法构建聚合管道，使用 `$sample` 阶段获取指定数量的随机文档

  - 当集合中文档的数量较大时，使用 `$sample` 阶段会导致性能问题

    - 在集合创建之初，使用随机索引为新增加的文档数据添加索引，有利于 `$sample` 阶段通过随机索引进行随机查询

- 无法通过mongodb自动生成的 `_id` 字段去查询对应的文档

  - 试了网上的很多方法都不行，因此插入文档的时候自己手动创建id，使用mongodb提供的ObjectId方法

- 将普通常量对象的属性和值赋值给一个响应式对象，而数据没有发生改变

  - 将普通对象定义为响应式对象。由于vue无法监听普通对象，即使逐个赋值给响应式对象也没作用，响应式对象并不会和普通对象形成一个相互依赖关系

- 如果想使用axios拦截客户端请求，要注意区分`process`是`client`还是`server`，否则会造成服务端的请求也被拦截导致本地服务出错

## 成果和收获

## 性能优化

### 构建&SEO

- 参考1：[vite打包性能优化](https://juejin.cn/post/7232688124416458789)

- 参考2：[Nuxt3如何 进行seo优化](https://juejin.cn/post/7179237881532121149)

### 视频

- 压缩视频：使用适当的视频压缩算法和编解码器来减小视频文件的大小，例如使用H.264或HEVC编码。

- 视频预加载：在网页加载时，使用预加载技术提前请求和缓存视频文件，以减少加载时间。

- 延迟加载：延迟加载视频，只有当用户需要观看时再加载，以减少初始页面加载时间。

- 自适应流媒体：使用自适应比特率流媒体技术，根据用户的网络带宽和设备性能动态调整视频的清晰度和比特率。

- 缓冲控制：通过控制视频的缓冲策略，平衡加载时间和播放的流畅性，避免缓冲过长或过短。

- 懒加载海报图：只在视频即将播放时加载视频的海报图，减少初始加载时的网络请求。

#### 视频预加载具体在代码怎么实现

1. `preload`属性设置为`metadata` 表示仅加载视频的元数据（如时长、尺寸等），而不加载整个视频文件，这样可以减少初始加载时间。

2. 通过监听`loadeddata`事件，可以在视频加载完成后执行相应的操作。

代码示例：

```html
<video src="video.mp4" preload="metadata"></video>
```

```javascript
// 监听视频加载完成事件
video.addEventListener('loadeddata', function() {
  console.log('视频加载完成');
  // 在此处可以执行其他操作，如显示播放按钮等
});
// 触发视频加载
video.load();
```

#### 动态调整缓冲策略怎么实现

根据网络状况动态调整缓冲策略。例如，当网络较慢时，可以增加缓冲时间以确保流畅播放；当网络较快时，可以减少缓冲时间以提高响应速度。

代码示例：

```js
// 监听视频加载完成事件
video.addEventListener('loadeddata', adjustBuffering);

// 监听网络状态变化事件
window.addEventListener('online', adjustBuffering);
window.addEventListener('offline', adjustBuffering);

// 动态调整缓冲策略
function adjustBuffering() {
    // 获取已缓冲数据
    const buffered = video.buffered;
    // 获取网络速度
    const networkSpeed = navigator.connection.downlink;
    if (buffered.length) {
      const bufferedEnd = buffered.end(buffered.length - 1);
      video.currentTime = networkSpeed < 2
          ? // 增加缓冲时间，适应较慢的网络
            bufferedEnd - 10
          : // 减少缓冲时间，提高响应速度
            bufferedEnd - 2;
    }
};
```
