# Short Video (short-video)

> 后端项目地址: <https://github.com/niu-grandpa/short-video-api>

## 简介

一个短视频点播平台

nuxt：无需配置路由-无需导入模块直接使用
pinia：vuex替代品-轻量级-使用方便
部署上线后，页面刷新没有404的问题

## 我的职责

- 数据库、后端模块、跨域处理、部署、前端组件、布局、持久化登录

- 构建应用数据流：使用pinia创建general、profile、user数据流模块，用于持久化存储应用数据、定义数据请求和通用行为等

- 实现用户鉴权：编写鉴权路由中间件并注入页面，防止越权跳转；利用axios请求拦截器注入用户token至请求头，用于后端校验请求的有效性；封装登录态校验hook，保证用户在有效登录下才能触发某些事件行为

- 封装视频组件：使用预加载技术提前请求和缓存视频文件，优化加载时间；根据网络状况编写动态调整视频缓冲策略的优化方法，提升播放体验；实现点赞、收藏、评论功能

- 负责视频页：实现视频前后切换，并使用数组缓存视频项数据，当切换时找到当前项所在缓存位置并根据前进或后退行为复用缓存数据，否则进行新的数据请求

- 负责视频页评论：

- 负责个人页：实现游客访问权限设置、视频权限可见范围设置，个人信息修改同步到profile数据流和数据库

## 遇到的问题

- 跨域问题

  - 1.在后端响应头中添加 `Access-Control-Allow-Origin` 字段，指定允许访问的域名

  - 2.前端临时搭建nginx反向代理

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

## 成果和收获

## 其他

### 前端在优化视频方面可以采取以下措施

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
