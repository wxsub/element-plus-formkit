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
    logo: 'https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/logo.png',
    locales: {
      '/': {
        selectLanguageName: '中文',
        selectLanguageText: '中文',
        selectLanguageAriaLabel: '中文',
        sidebar: [
          {
            text: '快速开始',
            link: '/get-started'
          },
          {
            text: '组件API',
            link: '/formkit-api'
          },
          {
            text: 'Config API',
            link: '/config-api'
          },
          {
            text: 'Expose',
            link: '/expose'
          },
          {
            text: '插槽',
            link: '/slot'
          },
          {
            text: '基础组件演示',
            link: '/basic-demo'
          },
          {
            text: '拓展方法',
            link: '/extension-methods'
          }
        ]
      },
      '/en/': {
        selectLanguageName: 'English',
        selectLanguageText: 'English',
        selectLanguageAriaLabel: 'English',
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
    }
  }),
  locales: {
    '/': {
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
  head: [['link', { rel: 'icon', href: 'https://raw.githubusercontent.com/wxsub/element-plus-formkit/refs/heads/main/pages/docs/public/logo.png' }]]
})
