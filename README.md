# FreshFunShop

FreshFunShop 是一个基于 uni-app、Vue 3、TypeScript 和 Vite 构建的多端商城应用，当前代码主要面向微信小程序，同时保留 H5、支付宝小程序、百度小程序、QQ 小程序等 uni-app 支持端的构建脚本。

项目覆盖商城常见核心流程：商品首页、分类浏览、热门推荐、商品详情、SKU 选择、购物车、登录、会员中心、地址管理、订单创建、订单列表、订单详情和支付结果。

## 技术栈

- uni-app 3
- Vue 3
- TypeScript
- Vite
- Pinia
- pinia-plugin-persistedstate
- SCSS
- uni-ui

## 功能模块

- 首页：轮播图、分类入口、热门推荐、猜你喜欢等内容展示
- 分类：商品分类列表与分类页骨架屏
- 商品详情：商品信息、服务说明、地址面板、SKU 弹窗
- 购物车：商品加入购物车、数量调整、选择、全选、删除
- 登录与会员：微信小程序登录、传统账号登录、会员资料维护
- 地址管理：地址列表、新增、编辑、删除
- 订单：订单预览、创建订单、订单列表、订单详情、确认收货、物流信息
- 支付：微信小程序支付参数获取与模拟支付

## 目录结构

```text
src
|-- components          # 公共组件
|-- composables         # 组合式逻辑
|-- pages               # 主包页面
|-- pagesMember         # 会员相关分包
|-- pagesOrder          # 订单相关分包
|-- services            # 接口请求封装
|-- static              # 静态资源
|-- stores              # Pinia 状态管理
|-- styles              # 全局样式资源
|-- types               # TypeScript 类型声明
|-- utils               # 工具函数
|-- App.vue             # 应用根组件
|-- main.ts             # 应用入口
|-- manifest.json       # uni-app 应用配置
`-- pages.json          # 页面、tabBar、分包配置
```

## 环境要求

- Node.js 18/20 LTS
- npm
- 微信开发者工具：运行或预览微信小程序时需要

## 安装依赖

```bash
npm install
```

## 本地运行

运行 H5：

```bash
npm run dev:h5
```

运行微信小程序：

```bash
npm run dev:mp-weixin
```

执行后将生成对应平台产物，可使用微信开发者工具打开输出目录进行调试。

## 构建

构建 H5：

```bash
npm run build:h5
```

构建微信小程序：

```bash
npm run build:mp-weixin
```

项目还保留了支付宝、百度、京东、快手、飞书、QQ、抖音、小红书等平台的 `dev:*` 和 `build:*` 脚本，具体命令见 `package.json`。

## 类型检查

```bash
npm run type-check
```

## 接口说明

接口统一通过 `src/utils/request.ts` 封装，并在请求拦截器中处理：

- 相对路径自动拼接后端基础地址
- 统一设置请求超时时间
- 统一追加 `source-client: miniapp` 请求头
- 登录后自动携带 `Authorization` token
- 401 或业务 token 失效时清理会员信息并跳转登录页

业务接口按领域放在 `src/services`：

- `home.ts`：首页数据
- `category.ts`：分类数据
- `goodsDetail.ts`：商品详情
- `cart.ts`：购物车
- `login.ts`：登录
- `profile.ts`：会员资料
- `address.ts`：地址管理
- `order.ts`：订单
- `pay.ts`：支付
- `hot.ts`：热门推荐

## 状态管理

项目使用 Pinia 管理全局状态，并通过 `pinia-plugin-persistedstate` 持久化小程序端数据。目前主要包含：

- `member`：会员登录信息和 token
- `address`：地址相关页面状态

入口文件 `src/main.ts` 已完成 Pinia 注册。

## 页面配置

页面、tabBar、分包和预下载规则集中维护在 `src/pages.json`：

- 主包：首页、登录、购物车、我的、分类、热门推荐、商品详情
- `pagesMember` 分包：设置、个人信息、地址列表、地址表单
- `pagesOrder` 分包：创建订单、订单详情、支付结果、订单列表

微信小程序相关配置在 `src/manifest.json` 的 `mp-weixin` 节点中维护。

## 开发约定

- 使用 `@` 指向 `src` 目录，别名配置见 `vite.config.ts`
- 业务类型统一放在 `src/types`
- 新接口优先放入对应领域的 `src/services/*.ts`
- 可复用 UI 优先沉淀到 `src/components`
- 跨页面复用逻辑优先放入 `src/composables`
