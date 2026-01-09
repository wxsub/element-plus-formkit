import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import path from 'path'

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          '@components': path.resolve(__dirname, './docs/components/')
        }
      }
    }
  }),
  theme: defaultTheme({
    locales: {
      '/zh/': {
        selectLanguageName: '中文',
        sidebar: [
          {
            text: '快速开始',
            link: '/zh/get-started'
          },
          {
            text: '组件API',
            link: '/zh/formkit-api'
          },
          {
            text: 'Config API',
            link: '/zh/config-api'
          },
          {
            text: 'Expose',
            link: '/zh/expose'
          },
          {
            text: '插槽',
            link: '/zh/slot'
          },
          {
            text: '基础组件演示',
            link: '/zh/basic-demo'
          },
          {
            text: '拓展方法',
            link: '/zh/extension-methods'
          }
        ]
      },
      '/en/': {
        selectLanguageName: 'English',
        sidebar: [
          {
            text: 'Quick Start',
            link: '/en/get-started'
          },
          {
            text: 'Formkit API',
            link: '/en/formkit-api'
          },
          {
            text: 'Config API',
            link: '/en/config-api'
          },
          {
            text: 'Expose',
            link: '/en/expose'
          },
          {
            text: 'Slot',
            link: '/en/slot'
          },
          {
            text: 'Basic Demo',
            link: '/en/basic-demo'
          },
          {
            text: 'Extension Methods',
            link: '/en/extension-methods'
          }
        ]
      }
    },
    selectLanguageText: '选择语言',
    selectLanguageAriaLabel: '选择语言'
  }),
  locales: {
    '/zh/': {
      lang: 'zh-CN',
      title: 'element-plus-formkit',
      description: '基于 ElementPlus 实现的数据驱动表单组件',
    },
    '/en/': {
      lang: 'en-US',
      title: 'element-plus-formkit',
      description: 'Data-driven form component based on ElementPlus implementation',
    },
  },
  base: '/element-plus-formkit/',
})
