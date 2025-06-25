import comp from "D:/Project/formkit-component/element-plus-formkit/pages/docs/.vuepress/.temp/pages/get-started.html.vue"
const data = JSON.parse("{\"path\":\"/get-started.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"基础组件使用\",\"slug\":\"基础组件使用\",\"link\":\"#基础组件使用\",\"children\":[]},{\"level\":2,\"title\":\"高级组件使用\",\"slug\":\"高级组件使用\",\"link\":\"#高级组件使用\",\"children\":[]},{\"level\":2,\"title\":\"文件上传\",\"slug\":\"文件上传\",\"link\":\"#文件上传\",\"children\":[]}],\"git\":{\"updatedTime\":1750822316000,\"contributors\":[{\"name\":\"NicolasHome\",\"username\":\"NicolasHome\",\"email\":\"1556363381@qq.com\",\"commits\":3,\"url\":\"https://github.com/NicolasHome\"}],\"changelog\":[{\"hash\":\"ed9019cf8a725dabb6a36f2d2e1f2767974b4fee\",\"time\":1750822316000,\"email\":\"1556363381@qq.com\",\"author\":\"NicolasHome\",\"message\":\"Added Instance type ref by component can't find component instance issue\"},{\"hash\":\"ab8b06910dfb2729b5d6acf6044817f9252c8081\",\"time\":1750768979000,\"email\":\"1556363381@qq.com\",\"author\":\"NicolasHome\",\"message\":\"Update get-started.md\"},{\"hash\":\"8cc68358de7edcf38ff234742430d8d2dd15882e\",\"time\":1750759904000,\"email\":\"1556363381@qq.com\",\"author\":\"NicolasHome\",\"message\":\"Added vuepress for component development environment debugging\"}]},\"filePathRelative\":\"get-started.md\"}")
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
