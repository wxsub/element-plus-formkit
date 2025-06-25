import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../app.DEYphLOS.mjs";
import "@vueuse/core";
import "element-plus";
import "lodash";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p>404 Not Found</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vuepress/.temp/pages/404.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _404_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const data = JSON.parse('{"path":"/404.html","title":"","lang":"zh-CN","frontmatter":{"layout":"NotFound"},"headers":[],"git":{},"filePathRelative":null}');
export {
  _404_html as comp,
  data
};
