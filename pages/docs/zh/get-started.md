# 快速上手
<p>
  <a href="https://www.npmjs.com/package/element-plus-formkit">
    <img src="https://img.shields.io/npm/v/element-plus-formkit" />
  </a>
  <a href="https://github.com/wxsub/element-plus-formkit">
    <img src="https://img.shields.io/npm/l/element-plus-formkit" />
  </a>
</p>

::: warning
Element-plus-formkit依赖于ElementPlus，所以在安装前你需要确保提前安装[element-plus](https://element-plus.org/zh-CN/guide/installation.html)
:::

## 安装(Install)

::: code-tabs
@tab pnpm
``` bash
pnpm add element-plus-formkit@latest
```

@tab yarn
``` bash
yarn add element-plus-formkit@latest
```

@tab npm
``` bash
npm install element-plus-formkit@latest --save
```
:::

## 使用（Use）
您需要在您项目的主入口（通常为main.ts）,将组件注入系统
``` ts{4,5,8}
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import 'element-plus-formkit/dist/index.css'

const app = createApp(App);

app.mount('#app');
```
在您的项目中使用.

```vue
<template>
  <formkit :config="formConfig" v-model="formData"></formkit>
</template>

<script setup lang="ts">
import formkit from 'element-plus-formkit';
</script>
```

## 浏览器直接引入

直接通过浏览器的 HTML 标签导入 Element Plus Formkit，然后就可以使用全局变量 formkit 了。

根据不同的 CDN 提供商有不同的引入方式， 我们在这里以 jsDelivr 举例。

``` js
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus/dist/index.css" />
<!-- Import Vue 3 -->
<script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
<!-- Import component library -->
<script src="https://cdn.jsdelivr.net/npm/element-plus"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus-formkit/dist/index.css">
<script src="https://cdn.jsdelivr.net/npm/element-plus-formkit/dist/formkit.umd.js"></script>
```

```html
<div id="app">
  <formkit :config="formConfig" v-model="formData"></formkit>
</div>

<script>
  const { createApp } = Vue;
  const app = createApp({
    data() {
      return {
        formConfig: [
          {
            type: 'input',
            key: 'username',
            label: '用户名',
            rules: [{ required: true, message: '请输入用户名' }]
          },
          {
            type: 'select',
            key: 'role',
            label: '角色',
            options: [
              { name: '管理员', id: 'admin' },
              { name: '普通用户', id: 'user' }
            ]
          }
        ],
        formData: {}
      }
    }
  });

  app.use(ElementPlus);

  app.component('formkit', formkit.default.install);
    
  app.mount('#app');
</script>
```