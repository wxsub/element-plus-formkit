---
home: true
title: ⚡ The form framework for Vue3 and ElementPlus
head:
  - - meta
    - name: keywords
      content: formkit, element-plus-formkit, element-plus, element-formkit, vue3 form, element-plus form
  - - meta
    - name: description
      content: element-plus-formkit is a data-driven form framework based on Vue3 and ElementPlus. It simplifies complex form validation and development with high performance.
heroImage: https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/logo.png
actions:
  - text: Get Started
    link: /en/get-started.html
    type: primary

  - text: Source Code
    link: https://github.com/wxsub/element-plus-formkit
    type: secondary

features:
  - title: Simple and Easy to Use
    details: Describe an entire form with a single config array, and develop complex forms with their validation rules quickly.
  - title: Data-Driven
    details: Built on ElementPlus form components, form data is processed through data flow, with conditional visibility (visible) and field linkage support.
  - title: High Performance
    details: element-plus-formkit fully complies with the Vue3 async component loading scheme for every component, with Suspense skeleton loading and smaller bundle size.
  - title: Rich Built-in Components
    details: Ships 20+ common form components out of the box (select, remoteSearchSelect, address, cascader, datePicker, upload, treeSelect, mention, etc.).
  - title: Remote Data Loading
    details: Fetch options asynchronously for select, radio, checkbox and more via requester / handler, with error fallback and error event callbacks.
  - title: Flexible Layout
    details: Supports multi-column layouts via columns, span / col grid config, gap settings, and labelWidth 'auto' for automatic label width measurement.
  - title: Extensible
    details: Register custom form components with registerModule, enjoying the same data flow and validation capabilities as built-in modules.
  - title: Full Form Capabilities
    details: Inherits the ElementPlus form system, exposing validate, clearValidate, resetFields, validateField, scrollToField and more, with TypeScript support.

footer: MIT Licensed | wxsub.com Studios Copyright © 2018-present All Rights Reserved
---

## Quick Start

```bash
pnpm add element-plus-formkit
```

```vue
<template>
  <FormKit v-model="form" :config="config" :columns="2" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormKit from 'element-plus-formkit'

const form = ref({ name: '', gender: '', birthday: '' })

const config = [
  { type: 'input', key: 'name', label: 'Name', rules: [{ required: true, message: 'Name is required' }] },
  { type: 'radio', key: 'gender', label: 'Gender', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 2 }] },
  { type: 'datePicker', key: 'birthday', label: 'Birthday' }
]
</script>
```

Render a complete form with validation and layout from a single config array. [Read the docs →](/en/get-started.html)

## Who's Using

The following companies and organizations are using element-plus-formkit in production (in no particular order):

<div class="who-using">
  <a class="who-using-item" href="https://hrss.ah.gov.cn/" target="_blank" rel="noopener noreferrer" title="Anhui Provincial Department of Human Resources and Social Security">
    <img src="https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/rst.png" alt="Anhui Provincial Department of Human Resources and Social Security" loading="lazy" />
    <span>Anhui HRSS</span>
  </a>
  <a class="who-using-item" href="http://www.tongqinglou.cn/" target="_blank" rel="noopener noreferrer" title="Tongqinglou">
    <img src="https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/tql.png" alt="Tongqinglou" loading="lazy" />
    <span>Tongqinglou</span>
  </a>
  <a class="who-using-item" href="https://www.cisco.com/" target="_blank" rel="noopener noreferrer" title="Cisco System">
    <img src="https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/cisco.svg" alt="Cisco System" loading="lazy" />
    <span>Cisco</span>
  </a>
  <a class="who-using-item" href="https://www.xdf.cn/" target="_blank" rel="noopener noreferrer" title="New Oriental Education">
    <img src="https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/xdf.png" alt="New Oriental Education" loading="lazy" />
    <span>New Oriental</span>
  </a>
  <a class="who-using-item" href="https://www.jdt.com.cn/" target="_blank" rel="noopener noreferrer" title="JD Technology">
    <img src="https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/jdt-logo.svg" alt="JD Technology" loading="lazy" />
    <span>JD Technology</span>
  </a>
  <a class="who-using-item" href="https://www.ahslyy.com.cn/rszp" target="_blank" rel="noopener noreferrer" title="The First Affiliated Hospital of USTC (Anhui Provincial Hospital)">
    <img src="https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/slyy.png" alt="The First Affiliated Hospital of USTC (Anhui Provincial Hospital)" loading="lazy" />
    <span>Anhui Provincial Hospital</span>
  </a>
</div>

<p class="who-using-tip">If your company is also using element-plus-formkit, feel free to open an <a href="https://github.com/wxsub/element-plus-formkit/issues" target="_blank" rel="noopener noreferrer">Issue</a> or PR to add your logo here.</p>

[default-theme-home]: https://vuejs.press/reference/default-theme/frontmatter.html#home-page
