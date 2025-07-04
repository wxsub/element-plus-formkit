import { defineClientConfig } from 'vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import formkit from 'element-plus-formkit'

export default defineClientConfig({
  async enhance({ app }) {
    app.use(ElementPlus)
    app.use(formkit)
  },
  setup() {},
  rootComponents: []
})