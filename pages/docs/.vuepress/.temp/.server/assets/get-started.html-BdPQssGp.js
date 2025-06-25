import { ref, computed, resolveComponent, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
const _sfc_main = {
  __name: "get-started.html",
  __ssrInlineRender: true,
  setup(__props) {
    const dataset = ref({});
    const FormKitConfig = computed(() => {
      return [
        {
          type: "input",
          label: "姓名 (Name)",
          key: "password",
          props: { placeholder: "请输入姓名" }
        },
        {
          type: "select",
          label: "性别 (Sex)",
          key: "sex",
          props: { placeholder: "请选择性别" },
          options: [
            { name: "男 man", id: 1 },
            { name: "女 woman", id: 2 }
          ]
        },
        {
          type: "datePicker",
          label: "出生日期 (Birthday)",
          key: "birthday",
          props: {
            placeholder: "请选择出生日期",
            valueFormat: "YYYY-MM-DD",
            type: "date",
            style: { width: "100%" }
          }
        },
        {
          type: "datePicker",
          label: "身份证有效期 (I.D. validity period)",
          key: "idDate",
          props: {
            placeholder: "请选择身份证有效期",
            valueFormat: "YYYY-MM-DD",
            type: "daterange",
            startPlaceholder: "开始时间 Start Time",
            endPlaceholder: "结束时间 End Time",
            style: { width: "100%" }
          }
        },
        {
          type: "inputNumber",
          label: "输入数字 (inputNumber)",
          rules: [
            { required: true, message: "输入数字不能为空" }
          ],
          key: "inputNumber",
          props: {
            style: { width: "100%" },
            placeholder: "请输入数字",
            min: 0
          }
        },
        {
          type: "rate",
          label: "等级 (Rate)",
          key: "sex"
        },
        {
          type: "radio",
          label: "是否显示隐藏项 (Show hidden items)",
          key: "show",
          options: [
            { name: "是 Yes", id: true },
            { name: "否 No", id: false }
          ]
        },
        {
          type: "input",
          label: "隐藏项 (hidden item)",
          key: "password",
          visible: { key: "show" },
          props: { placeholder: "请输入隐藏项" }
        }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormKit = resolveComponent("FormKit");
      const _component_CodeTabs = resolveComponent("CodeTabs");
      _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="基础组件使用" tabindex="-1"><a class="header-anchor" href="#基础组件使用"><span>基础组件使用</span></a></h2><p>Element-Plus-Formkit基础组件包含: ${ssrInterpolate(Array.from(new Set(FormKitConfig.value.map((it) => it.type))).join(" 、 "))}</p><div>`);
      _push(ssrRenderComponent(_component_FormKit, {
        modelValue: dataset.value,
        "onUpdate:modelValue": ($event) => dataset.value = $event,
        config: FormKitConfig.value
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_CodeTabs, {
        id: "7",
        data: [{ "id": "Template" }, { "id": "TypeScript" }]
      }, {
        title0: withCtx(({ value, isActive }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Template`);
          } else {
            return [
              createTextVNode("Template")
            ];
          }
        }),
        title1: withCtx(({ value, isActive }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`TypeScript`);
          } else {
            return [
              createTextVNode("TypeScript")
            ];
          }
        }),
        tab0: withCtx(({ value, isActive }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"${_scopeId}><pre${_scopeId}><code${_scopeId}><span class="line"${_scopeId}><span class="token tag"${_scopeId}><span class="token tag"${_scopeId}><span class="token punctuation"${_scopeId}>&lt;</span>FormKit</span> <span class="token attr-name"${_scopeId}>v-model</span><span class="token attr-value"${_scopeId}><span class="token punctuation attr-equals"${_scopeId}>=</span><span class="token punctuation"${_scopeId}>&quot;</span>dataset<span class="token punctuation"${_scopeId}>&quot;</span></span> <span class="token attr-name"${_scopeId}>:config</span><span class="token attr-value"${_scopeId}><span class="token punctuation attr-equals"${_scopeId}>=</span><span class="token punctuation"${_scopeId}>&quot;</span>FormKitConfig<span class="token punctuation"${_scopeId}>&quot;</span></span> <span class="token punctuation"${_scopeId}>/&gt;</span></span></span>
<span class="line"${_scopeId}></span></code></pre><div class="line-numbers" aria-hidden="true" style="${ssrRenderStyle({ "counter-reset": "line-number 0" })}"${_scopeId}><div class="line-number"${_scopeId}></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "language-vue line-numbers-mode",
                "data-highlighter": "prismjs",
                "data-ext": "vue"
              }, [
                createVNode("pre", null, [
                  createVNode("code", null, [
                    createVNode("span", { class: "line" }, [
                      createVNode("span", { class: "token tag" }, [
                        createVNode("span", { class: "token tag" }, [
                          createVNode("span", { class: "token punctuation" }, "<"),
                          createTextVNode("FormKit")
                        ]),
                        createTextVNode(),
                        createVNode("span", { class: "token attr-name" }, "v-model"),
                        createVNode("span", { class: "token attr-value" }, [
                          createVNode("span", { class: "token punctuation attr-equals" }, "="),
                          createVNode("span", { class: "token punctuation" }, '"'),
                          createTextVNode("dataset"),
                          createVNode("span", { class: "token punctuation" }, '"')
                        ]),
                        createTextVNode(),
                        createVNode("span", { class: "token attr-name" }, ":config"),
                        createVNode("span", { class: "token attr-value" }, [
                          createVNode("span", { class: "token punctuation attr-equals" }, "="),
                          createVNode("span", { class: "token punctuation" }, '"'),
                          createTextVNode("FormKitConfig"),
                          createVNode("span", { class: "token punctuation" }, '"')
                        ]),
                        createTextVNode(),
                        createVNode("span", { class: "token punctuation" }, "/>")
                      ])
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" })
                  ])
                ]),
                createVNode("div", {
                  class: "line-numbers",
                  "aria-hidden": "true",
                  style: { "counter-reset": "line-number 0" }
                }, [
                  createVNode("div", { class: "line-number" })
                ])
              ])
            ];
          }
        }),
        tab1: withCtx(({ value, isActive }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"${_scopeId}><pre${_scopeId}><code${_scopeId}><span class="line"${_scopeId}><span class="token operator"${_scopeId}>&lt;</span>script setup<span class="token operator"${_scopeId}>&gt;</span></span>
<span class="line"${_scopeId}><span class="token keyword"${_scopeId}>import</span> <span class="token punctuation"${_scopeId}>{</span> ref<span class="token punctuation"${_scopeId}>,</span> computed <span class="token punctuation"${_scopeId}>}</span> <span class="token keyword"${_scopeId}>from</span> <span class="token string"${_scopeId}>&#39;vue&#39;</span><span class="token punctuation"${_scopeId}>;</span></span>
<span class="line"${_scopeId}></span>
<span class="line"${_scopeId}><span class="token keyword"${_scopeId}>const</span> dataset <span class="token operator"${_scopeId}>=</span> <span class="token function"${_scopeId}>ref</span><span class="token punctuation"${_scopeId}>(</span><span class="token punctuation"${_scopeId}>{</span><span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>)</span></span>
<span class="line"${_scopeId}></span>
<span class="line"${_scopeId}><span class="token keyword"${_scopeId}>const</span> FormKitConfig <span class="token operator"${_scopeId}>=</span> <span class="token function"${_scopeId}>computed</span><span class="token punctuation"${_scopeId}>(</span><span class="token punctuation"${_scopeId}>(</span><span class="token punctuation"${_scopeId}>)</span> <span class="token operator"${_scopeId}>=&gt;</span> <span class="token punctuation"${_scopeId}>{</span></span>
<span class="line"${_scopeId}>    <span class="token keyword"${_scopeId}>return</span> <span class="token punctuation"${_scopeId}>[</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>{</span></span>
<span class="line"${_scopeId}>            type<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;input&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            label<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;姓名 (Name)&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            key<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;password&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            props<span class="token operator"${_scopeId}>:</span> <span class="token punctuation"${_scopeId}>{</span> placeholder<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;请输入姓名&#39;</span> <span class="token punctuation"${_scopeId}>}</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>{</span></span>
<span class="line"${_scopeId}>            type<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;select&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            label<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;性别 (Sex)&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            key<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;sex&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            props<span class="token operator"${_scopeId}>:</span> <span class="token punctuation"${_scopeId}>{</span> placeholder<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;请选择性别&#39;</span> <span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            options<span class="token operator"${_scopeId}>:</span> <span class="token punctuation"${_scopeId}>[</span></span>
<span class="line"${_scopeId}>                <span class="token punctuation"${_scopeId}>{</span> name<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;男 man&#39;</span><span class="token punctuation"${_scopeId}>,</span> id<span class="token operator"${_scopeId}>:</span> <span class="token number"${_scopeId}>1</span> <span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>                <span class="token punctuation"${_scopeId}>{</span> name<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;女 woman&#39;</span><span class="token punctuation"${_scopeId}>,</span> id<span class="token operator"${_scopeId}>:</span> <span class="token number"${_scopeId}>2</span> <span class="token punctuation"${_scopeId}>}</span></span>
<span class="line"${_scopeId}>            <span class="token punctuation"${_scopeId}>]</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>{</span></span>
<span class="line"${_scopeId}>            type<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;datePicker&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            label<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;出生日期 (Birthday)&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            key<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;birthday&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            props<span class="token operator"${_scopeId}>:</span> <span class="token punctuation"${_scopeId}>{</span></span>
<span class="line"${_scopeId}>                placeholder<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;请选择出生日期&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>                valueFormat<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&quot;YYYY-MM-DD&quot;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>                type<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&quot;date&quot;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>                style<span class="token operator"${_scopeId}>:</span> <span class="token punctuation"${_scopeId}>{</span> width<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;100%&#39;</span> <span class="token punctuation"${_scopeId}>}</span></span>
<span class="line"${_scopeId}>            <span class="token punctuation"${_scopeId}>}</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>{</span></span>
<span class="line"${_scopeId}>            type<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;datePicker&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            label<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;身份证有效期 (I.D. validity period)&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            key<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;idDate&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            props<span class="token operator"${_scopeId}>:</span> <span class="token punctuation"${_scopeId}>{</span></span>
<span class="line"${_scopeId}>                placeholder<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;请选择身份证有效期&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>                valueFormat<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&quot;YYYY-MM-DD&quot;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>                type<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&quot;daterange&quot;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>                startPlaceholder<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;开始时间 Start Time&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>                endPlaceholder<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;结束时间 End Time&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>                style<span class="token operator"${_scopeId}>:</span> <span class="token punctuation"${_scopeId}>{</span> width<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;100%&#39;</span> <span class="token punctuation"${_scopeId}>}</span></span>
<span class="line"${_scopeId}>            <span class="token punctuation"${_scopeId}>}</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>{</span></span>
<span class="line"${_scopeId}>            type<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;inputNumber&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            label<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;输入数字 (inputNumber)&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            rules<span class="token operator"${_scopeId}>:</span> <span class="token punctuation"${_scopeId}>[</span></span>
<span class="line"${_scopeId}>                <span class="token punctuation"${_scopeId}>{</span> required<span class="token operator"${_scopeId}>:</span> <span class="token boolean"${_scopeId}>true</span><span class="token punctuation"${_scopeId}>,</span> message<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;输入数字不能为空&#39;</span> <span class="token punctuation"${_scopeId}>}</span></span>
<span class="line"${_scopeId}>            <span class="token punctuation"${_scopeId}>]</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            key<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;inputNumber&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            props<span class="token operator"${_scopeId}>:</span> <span class="token punctuation"${_scopeId}>{</span></span>
<span class="line"${_scopeId}>                style<span class="token operator"${_scopeId}>:</span> <span class="token punctuation"${_scopeId}>{</span> width<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;100%&#39;</span> <span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>                placeholder<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;请输入数字&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>                min<span class="token operator"${_scopeId}>:</span> <span class="token number"${_scopeId}>0</span></span>
<span class="line"${_scopeId}>            <span class="token punctuation"${_scopeId}>}</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>{</span></span>
<span class="line"${_scopeId}>            type<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;rate&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            label<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;等级 (Rate)&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            key<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;sex&#39;</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>{</span></span>
<span class="line"${_scopeId}>            type<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;radio&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            label<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;是否显示隐藏项 (Show hidden items)&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            key<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;show&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            options<span class="token operator"${_scopeId}>:</span> <span class="token punctuation"${_scopeId}>[</span></span>
<span class="line"${_scopeId}>                <span class="token punctuation"${_scopeId}>{</span> name<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;是 Yes&#39;</span><span class="token punctuation"${_scopeId}>,</span> id<span class="token operator"${_scopeId}>:</span> <span class="token boolean"${_scopeId}>true</span> <span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>                <span class="token punctuation"${_scopeId}>{</span> name<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;否 No&#39;</span><span class="token punctuation"${_scopeId}>,</span> id<span class="token operator"${_scopeId}>:</span> <span class="token boolean"${_scopeId}>false</span> <span class="token punctuation"${_scopeId}>}</span></span>
<span class="line"${_scopeId}>            <span class="token punctuation"${_scopeId}>]</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>{</span></span>
<span class="line"${_scopeId}>            type<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;input&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            label<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;隐藏项 (hidden item)&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            key<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;password&#39;</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            visible<span class="token operator"${_scopeId}>:</span> <span class="token punctuation"${_scopeId}>{</span> key<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;show&#39;</span> <span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>,</span></span>
<span class="line"${_scopeId}>            props<span class="token operator"${_scopeId}>:</span> <span class="token punctuation"${_scopeId}>{</span> placeholder<span class="token operator"${_scopeId}>:</span> <span class="token string"${_scopeId}>&#39;请输入隐藏项&#39;</span> <span class="token punctuation"${_scopeId}>}</span></span>
<span class="line"${_scopeId}>        <span class="token punctuation"${_scopeId}>}</span></span>
<span class="line"${_scopeId}>    <span class="token punctuation"${_scopeId}>]</span></span>
<span class="line"${_scopeId}><span class="token punctuation"${_scopeId}>}</span><span class="token punctuation"${_scopeId}>)</span></span>
<span class="line"${_scopeId}><span class="token operator"${_scopeId}>&lt;</span><span class="token operator"${_scopeId}>/</span>script<span class="token operator"${_scopeId}>&gt;</span></span>
<span class="line"${_scopeId}></span></code></pre><div class="line-numbers" aria-hidden="true" style="${ssrRenderStyle({ "counter-reset": "line-number 0" })}"${_scopeId}><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div><div class="line-number"${_scopeId}></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "language-typescript line-numbers-mode",
                "data-highlighter": "prismjs",
                "data-ext": "ts"
              }, [
                createVNode("pre", null, [
                  createVNode("code", null, [
                    createVNode("span", { class: "line" }, [
                      createVNode("span", { class: "token operator" }, "<"),
                      createTextVNode("script setup"),
                      createVNode("span", { class: "token operator" }, ">")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createVNode("span", { class: "token keyword" }, "import"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createTextVNode(" ref"),
                      createVNode("span", { class: "token punctuation" }, ","),
                      createTextVNode(" computed "),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createTextVNode(),
                      createVNode("span", { class: "token keyword" }, "from"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'vue'"),
                      createVNode("span", { class: "token punctuation" }, ";")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createVNode("span", { class: "token keyword" }, "const"),
                      createTextVNode(" dataset "),
                      createVNode("span", { class: "token operator" }, "="),
                      createTextVNode(),
                      createVNode("span", { class: "token function" }, "ref"),
                      createVNode("span", { class: "token punctuation" }, "("),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ")")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createVNode("span", { class: "token keyword" }, "const"),
                      createTextVNode(" FormKitConfig "),
                      createVNode("span", { class: "token operator" }, "="),
                      createTextVNode(),
                      createVNode("span", { class: "token function" }, "computed"),
                      createVNode("span", { class: "token punctuation" }, "("),
                      createVNode("span", { class: "token punctuation" }, "("),
                      createVNode("span", { class: "token punctuation" }, ")"),
                      createTextVNode(),
                      createVNode("span", { class: "token operator" }, "=>"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "{")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("    "),
                      createVNode("span", { class: "token keyword" }, "return"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "[")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "{")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            type"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'input'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            label"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'姓名 (Name)'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            key"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'password'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            props"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createTextVNode(" placeholder"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'请输入姓名'"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "}")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "{")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            type"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'select'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            label"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'性别 (Sex)'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            key"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'sex'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            props"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createTextVNode(" placeholder"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'请选择性别'"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            options"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "[")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                "),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createTextVNode(" name"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'男 man'"),
                      createVNode("span", { class: "token punctuation" }, ","),
                      createTextVNode(" id"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token number" }, "1"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                "),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createTextVNode(" name"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'女 woman'"),
                      createVNode("span", { class: "token punctuation" }, ","),
                      createTextVNode(" id"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token number" }, "2"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "}")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            "),
                      createVNode("span", { class: "token punctuation" }, "]")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "{")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            type"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'datePicker'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            label"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'出生日期 (Birthday)'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            key"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'birthday'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            props"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "{")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                placeholder"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'请选择出生日期'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                valueFormat"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, '"YYYY-MM-DD"'),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                type"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, '"date"'),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                style"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createTextVNode(" width"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'100%'"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "}")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            "),
                      createVNode("span", { class: "token punctuation" }, "}")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "{")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            type"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'datePicker'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            label"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'身份证有效期 (I.D. validity period)'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            key"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'idDate'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            props"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "{")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                placeholder"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'请选择身份证有效期'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                valueFormat"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, '"YYYY-MM-DD"'),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                type"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, '"daterange"'),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                startPlaceholder"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'开始时间 Start Time'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                endPlaceholder"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'结束时间 End Time'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                style"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createTextVNode(" width"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'100%'"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "}")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            "),
                      createVNode("span", { class: "token punctuation" }, "}")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "{")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            type"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'inputNumber'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            label"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'输入数字 (inputNumber)'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            rules"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "[")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                "),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createTextVNode(" required"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token boolean" }, "true"),
                      createVNode("span", { class: "token punctuation" }, ","),
                      createTextVNode(" message"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'输入数字不能为空'"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "}")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            "),
                      createVNode("span", { class: "token punctuation" }, "]"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            key"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'inputNumber'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            props"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "{")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                style"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createTextVNode(" width"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'100%'"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                placeholder"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'请输入数字'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                min"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token number" }, "0")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            "),
                      createVNode("span", { class: "token punctuation" }, "}")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "{")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            type"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'rate'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            label"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'等级 (Rate)'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            key"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'sex'")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "{")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            type"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'radio'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            label"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'是否显示隐藏项 (Show hidden items)'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            key"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'show'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            options"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "[")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                "),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createTextVNode(" name"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'是 Yes'"),
                      createVNode("span", { class: "token punctuation" }, ","),
                      createTextVNode(" id"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token boolean" }, "true"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("                "),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createTextVNode(" name"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'否 No'"),
                      createVNode("span", { class: "token punctuation" }, ","),
                      createTextVNode(" id"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token boolean" }, "false"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "}")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            "),
                      createVNode("span", { class: "token punctuation" }, "]")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "{")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            type"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'input'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            label"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'隐藏项 (hidden item)'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            key"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'password'"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            visible"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createTextVNode(" key"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'show'"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ",")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("            props"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "{"),
                      createTextVNode(" placeholder"),
                      createVNode("span", { class: "token operator" }, ":"),
                      createTextVNode(),
                      createVNode("span", { class: "token string" }, "'请输入隐藏项'"),
                      createTextVNode(),
                      createVNode("span", { class: "token punctuation" }, "}")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("        "),
                      createVNode("span", { class: "token punctuation" }, "}")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createTextVNode("    "),
                      createVNode("span", { class: "token punctuation" }, "]")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createVNode("span", { class: "token punctuation" }, "}"),
                      createVNode("span", { class: "token punctuation" }, ")")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" }, [
                      createVNode("span", { class: "token operator" }, "<"),
                      createVNode("span", { class: "token operator" }, "/"),
                      createTextVNode("script"),
                      createVNode("span", { class: "token operator" }, ">")
                    ]),
                    createTextVNode("\n"),
                    createVNode("span", { class: "line" })
                  ])
                ]),
                createVNode("div", {
                  class: "line-numbers",
                  "aria-hidden": "true",
                  style: { "counter-reset": "line-number 0" }
                }, [
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" }),
                  createVNode("div", { class: "line-number" })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hint-container tip"><p class="hint-container-title">提示</p><p>visible属性支持：Object、Array、Boolean</p></div><h2 id="高级组件使用" tabindex="-1"><a class="header-anchor" href="#高级组件使用"><span>高级组件使用</span></a></h2><h2 id="文件上传" tabindex="-1"><a class="header-anchor" href="#文件上传"><span>文件上传</span></a></h2></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vuepress/.temp/pages/get-started.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const data = JSON.parse('{"path":"/get-started.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"基础组件使用","slug":"基础组件使用","link":"#基础组件使用","children":[]},{"level":2,"title":"高级组件使用","slug":"高级组件使用","link":"#高级组件使用","children":[]},{"level":2,"title":"文件上传","slug":"文件上传","link":"#文件上传","children":[]}],"git":{"updatedTime":1750768979000,"contributors":[{"name":"NicolasHome","username":"NicolasHome","email":"1556363381@qq.com","commits":2,"url":"https://github.com/NicolasHome"}],"changelog":[{"hash":"ab8b06910dfb2729b5d6acf6044817f9252c8081","time":1750768979000,"email":"1556363381@qq.com","author":"NicolasHome","message":"Update get-started.md"},{"hash":"8cc68358de7edcf38ff234742430d8d2dd15882e","time":1750759904000,"email":"1556363381@qq.com","author":"NicolasHome","message":"Added vuepress for component development environment debugging"}]},"filePathRelative":"get-started.md"}');
export {
  _sfc_main as comp,
  data
};
