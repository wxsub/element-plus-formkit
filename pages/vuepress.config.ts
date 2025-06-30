import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    sidebar: [
      {
        text: '快速开始(Quick Start)',
        link: '/get-started'
      },
      {
        text: '组件API(Formkit API)',
        link: '/formkit-api'
      },
      {
        text: 'Config API',
        link: '/config-api'
      },
      {
        text: '基础组件演示(Basic Demo)',
        link: '/basic-demo'
      }
    ]
  }),
  lang: 'zh-CN',
  base: '/element-plus-formkit/',
  title: 'element-plus-formkit',
  description: '基于 ElementPlus 实现的数据驱动表单组件',
})
