## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# vue3 pinia ts

## 开始
### 下载项目
```
git clone https://github.com/vernonin/vue3-pinia-ts.git
```

### 安装依赖
```
cd vue3-pinia-ts

npm install
```
### 运行
```
npm run dev
```



## 目录结构
```
> src/



| -- assets  svg图标及css样式
| -- |-- bass.css   基础通用样式
| -- |-- main.css   main样式
| -- |-- closeSearch.svg   搜索框右侧关闭按钮
| -- |-- search.svg   搜索框左侧搜索按钮
| -- |-- star.svg   应用列表应用星级
| -- |-- noStar.svg   应用列表应用星级

| -- |
| -- components   组件
| -- | -- common  通用组件
| -- | -- | -- Divider.vue   下滑分割线
| -- | -- | -- Scroll 滚动组件
| -- |
| -- views   页面
| -- | -- detail  应用详情页面文件夹
| -- | -- | -- AppDetails.vue  详情组件
| -- | -- search   应用搜索页面文件夹
| -- | -- | -- indexPage.vue  首页组件
| -- | -- | -- AppLists.vue  列表组件
| -- | -- | -- RecommendApp.vue  推荐组件
| -- | -- | -- SearchInput.vue  搜索组件
| -- |
| -- stores   仓库
| -- | -- pinia.ts   pinia仓库
| -- |
| -- router   路由
| -- | -- index.ts   路由入口
| -- |
| -- request   工具文件夹
| -- | -- api.ts   api统一入口
| -- | -- request.ts   封装axios
| -- |
| -- App.vue   所有组件的父组件 
| -- |
| -- mian.ts   入口文件


```



