import comp from "D:/Project/formkit-component/element-plus-formkit/docs/docs/.vuepress/.temp/pages/tag/tag-a/index.html.vue"
const data = JSON.parse("{\"path\":\"/tag/tag-a/\",\"title\":\"Tag tag A\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Tag tag A\",\"sidebar\":false,\"blog\":{\"type\":\"category\",\"name\":\"tag A\",\"key\":\"tag\"},\"layout\":\"Tag\"},\"headers\":[],\"git\":{},\"filePathRelative\":null,\"excerpt\":\"\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
