---
home: true
title: ⚡ 基于 Vue3 和 ElementPlus 的表单框架
head:
  - - meta
    - name: keywords
      content: formkit, element-plus-formkit, element-plus, element-formkit, vue3 form, element-plus form
  - - meta
    - name: description
      content: element-plus-formkit 是基于 Vue3 和 ElementPlus 的数据驱动表单框架。通过组合封装与数据流处理，让复杂的表单及校验开发更简单快捷、高性能。
heroImage: https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/logo.png
actions:
  - text: 开始
    link: /get-started.html
    type: primary

  - text: 源码地址
    link: https://github.com/wxsub/element-plus-formkit
    type: secondary

features:
  - title: 简单至上
    details: 通过一个配置数组描述整个表单，面对复杂的表单以及其校验项，快速开发。
  - title: 数据驱动
    details: 基于 ElementPlus 对表单组件进行组合封装，通过数据流的方法对表单数据进行处理，支持条件显隐（visible）与字段联动。
  - title: 高性能
    details: element-plus-formkit 为每个组件的加载完全符合 Vue3 异步组件方案，配合 Suspense 骨架屏按需加载，打包体积更小。
  - title: 丰富的内置组件
    details: 内置 20+ 常用表单组件（select、remoteSearchSelect、address、cascader、datePicker、upload、treeSelect、mention 等），开箱即用。
  - title: 远程数据加载
    details: 通过 requester / handler 为 select、radio、checkbox 等组件异步拉取选项数据，并支持错误兜底与 error 事件回调。
  - title: 灵活布局
    details: 支持 columns 多列布局、span / col 栅格配置、gap 间距设置，以及 labelWidth 'auto' 自动测量标签宽度。
  - title: 可扩展
    details: 通过 registerModule 注册自定义表单组件，与内置模块享有相同的数据流与校验能力。
  - title: 完整的表单能力
    details: 继承 ElementPlus 表单体系，暴露 validate、clearValidate、resetFields、validateField、scrollToField 等完整 API，支持 TypeScript。

footer: MIT Licensed | wxsub.com Studios Copyright © 2018-present All Rights Reserved
---

## 快速体验

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
  { type: 'input', key: 'name', label: '姓名', rules: [{ required: true, message: '请输入姓名' }] },
  { type: 'radio', key: 'gender', label: '性别', options: [{ label: '男', value: 1 }, { label: '女', value: 2 }] },
  { type: 'datePicker', key: 'birthday', label: '出生日期' }
]
</script>
```

只需一个配置数组，即可渲染出带校验、带布局的完整表单。[查看文档开始 →](/get-started.html)

## 谁在使用

以下企业和机构正在生产环境中使用 element-plus-formkit（排名不分先后）：

<div class="who-using">
  <a class="who-using-item" href="https://hrss.ah.gov.cn/" target="_blank" rel="noopener noreferrer" title="安徽省人力资源和社会保障厅">
    <img src="https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/rst.png" alt="安徽省人力资源和社会保障厅" loading="lazy" />
    <span>安徽省人社厅</span>
  </a>
  <a class="who-using-item" href="http://www.tongqinglou.cn/" target="_blank" rel="noopener noreferrer" title="同庆楼">
    <img src="https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/tql.png" alt="同庆楼" loading="lazy" />
    <span>同庆楼</span>
  </a>
  <a class="who-using-item" href="https://www.cisco.com/" target="_blank" rel="noopener noreferrer" title="Cisco System">
    <img src="https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/cisco.svg" alt="Cisco System" loading="lazy" />
    <span>Cisco</span>
  </a>
  <a class="who-using-item" href="https://www.xdf.cn/" target="_blank" rel="noopener noreferrer" title="新东方教育">
    <img src="https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/xdf.png" alt="新东方教育" loading="lazy" />
    <span>新东方教育</span>
  </a>
  <a class="who-using-item" href="https://www.jdt.com.cn/" target="_blank" rel="noopener noreferrer" title="京东科技">
    <img src="https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/jdt-logo.svg" alt="京东科技" loading="lazy" />
    <span>京东科技</span>
  </a>
  <a class="who-using-item" href="https://www.ahslyy.com.cn/rszp" target="_blank" rel="noopener noreferrer" title="中国科学技术大学附属第一医院（安徽省立医院）">
    <img src="https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/slyy.png" alt="中国科学技术大学附属第一医院（安徽省立医院）" loading="lazy" />
    <span>安徽省立医院</span>
  </a>
</div>

<p class="who-using-tip">如果你的企业也在使用 element-plus-formkit，欢迎提交 <a href="https://github.com/wxsub/element-plus-formkit/issues" target="_blank" rel="noopener noreferrer">Issue</a> 或 PR，将 Logo 展示在这里。</p>

[default-theme-home]: https://vuejs.press/reference/default-theme/frontmatter.html#home-page
