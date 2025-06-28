import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),
  lang: 'zh-CN',
  base: '/element-plus-formkit/',
  title: 'element-plus-formkit',
  description: '基于 ElementPlus 实现的数据驱动表单组件',
})
