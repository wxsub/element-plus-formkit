import { defineClientConfig } from 'vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/theme-overrides.scss'

export default defineClientConfig({
  async enhance({ app }) {
    app.use(ElementPlus)
  },
  setup() {},
  rootComponents: []
})