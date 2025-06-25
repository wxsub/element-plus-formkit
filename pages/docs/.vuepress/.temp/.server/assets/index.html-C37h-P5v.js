import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../app.DEYphLOS.mjs";
import "@vueuse/core";
import "element-plus";
import "lodash";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vuepress/.temp/pages/index.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const data = JSON.parse('{"path":"/","title":"Home","lang":"zh-CN","frontmatter":{"home":true,"title":"Home","heroImage":"/public/logo.jpeg","actions":[{"text":"开始","link":"/get-started.html","type":"primary"},{"text":"源码地址","link":"https://github.com/wxsub/element-plus-formkit","type":"secondary"}],"features":[{"title":"简单至上","details":"面对复杂的表单以及其校验项，快速开发."},{"title":"基于Vue3 and ElementPlus","details":"基于ElementPlus对表单组件进行组合封装，通过数据流的方法对表单数据进行处理，方便快速开发."},{"title":"高性能","details":"element-plus-formkit 为每个组件的加载完全符合vue3异步组件方案."}],"footer":"MIT Licensed | wxsub.com Studios Copyright © 2018-present All Rights Reserved"},"headers":[],"git":{"updatedTime":1750759904000,"contributors":[{"name":"NicolasHome","username":"NicolasHome","email":"1556363381@qq.com","commits":1,"url":"https://github.com/NicolasHome"}],"changelog":[{"hash":"8cc68358de7edcf38ff234742430d8d2dd15882e","time":1750759904000,"email":"1556363381@qq.com","author":"NicolasHome","message":"Added vuepress for component development environment debugging"}]},"filePathRelative":"README.md"}');
export {
  index_html as comp,
  data
};
