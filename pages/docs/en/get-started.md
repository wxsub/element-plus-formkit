# Get started quickly
<p>
  <a href="https://www.npmjs.com/package/element-plus-formkit">
    <img src="https://img.shields.io/npm/v/element-plus-formkit" />
  </a>
  <a href="https://github.com/wxsub/element-plus-formkit">
    <img src="https://img.shields.io/npm/l/element-plus-formkit" />
  </a>
</p>

::: warning
Element-plus-formkit depends on ElementPlus, so you need to ensure that ElementPlus is installed before installation.
:::

## Install

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

## Use
You need to inject the component into the system in your project's main entry (usually main.ts).
``` ts{4,5,8}
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import 'element-plus-formkit/dist/index.css'

const app = createApp(App);

app.mount('#app');
```
In your project, use it like this.

```vue
<template>
  <formkit :config="formConfig" v-model="formData"></formkit>
</template>

<script setup lang="ts">
import formkit from 'element-plus-formkit';
</script>
```

## Browser import

You can import Element Plus Formkit directly through the browser's HTML tag, and then you can use the global variable formkit.

Depending on the different CDN providers, there are different import methods. We take jsDelivr as an example here.

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
            label: 'Username',
            rules: [{ required: true, message: 'Please enter a username' }]
          },
          {
            type: 'select',
            key: 'role',
            label: 'Role',
            options: [
              { name: 'admin', id: 'admin' },
              { name: 'user', id: 'user' }
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