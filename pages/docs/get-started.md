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
import formkit from 'element-plus-formkit';
import 'element-plus-formkit/dist/index.css'

const app = createApp(App);
app.use(formkit);

app.mount('#app');
```
如此你便可以在您的项目中使用了。

```vue
<formkit v-model="dataset" :config="[]" />
```