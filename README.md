# Short Video (short-video)

> 后端项目地址: <https://github.com/niu-grandpa/short-video-api>

## 简介

一个短视频点播平台

nuxt：无需配置路由-无需导入模块直接使用
pinia：vuex替代品-轻量级-使用方便
部署上线后，页面刷新没有404的问题

## 我的职责

- 搭建前后端与数据库，编写用户、视频、权限和评论接口；封装基于axios通用函数，拦截错误处理等边界条件；使用jwt生成token，postman测试接口等

- 构建应用数据流：使用pinia创建general、profile、user数据流模块，存储用户数据和定义全局状态、数据请求和通用行为等

- 实现用户鉴权：前端请求头带上token，后端校验token有效性并返回相应状态码；编写nuxt路由中间件用于权鉴页面跳转合法性；封装登录态钩子函数，用于播放、评论等事件执行前鉴权

- 负责首页：获取随机推荐用户，封装视频组件实现点赞、收藏、评论功能；实现防抖避免鼠标经过视频立即播放，使用滚动加载分页请求视频数据，提升渲染长列表性能；

- 实现滚动加载：封装触底函数与组件，整合数据请求、防抖、错误处理、提供数组分段加载等功能于一体

- 负责视频评论模块：封装评论组件、

- 负责个人页：用户访问权限控制；视频权限设置仅自己可见、好友可见、公开；个人信息修改同步至状态管理器、数据库

## 遇到的问题

- 跨域问题

  - 在后端使用 `cors` 中间件，配置允许与前端某个地址通信

    ```ts
    app.use(cors({
      origin(origin, callback) {
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    }));
    ```

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

## 成果和收获
