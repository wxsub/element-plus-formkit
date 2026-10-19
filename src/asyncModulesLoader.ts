import { defineAsyncComponent } from 'vue';
import type { Component } from 'vue';
import * as ElementPlus from 'element-plus';

export const asyncElementPlus = (componentName: string): Component => {
  return defineAsyncComponent(async () => {
    // 注意：必须用运行时变量做计算属性访问，静态具名访问（如 ElementPlus.ElMention）
    // 会被用户端的 Rollup 做导出校验，低版本 element-plus 缺少该导出时直接导致构建失败
    const component = (ElementPlus as any)[componentName];
    if (!component) {
      console.warn(`[element-plus-formkit] The component "${componentName}" does not exist in the current version of element-plus; please upgrade element-plus before using this component.`);
      return { render: () => null };
    }
    return component;
  });
};

export const Modules: Record<string, Component> = {
  select: defineAsyncComponent(() => import('./modules/select.vue')),
  remoteSearchSelect: defineAsyncComponent(() => import('./modules/remoteSearchSelect.vue')),
  address: defineAsyncComponent(() => import('./modules/address.vue')),
  checkbox: defineAsyncComponent(() => import('./modules/checkbox.vue')),
  radio: defineAsyncComponent(() => import('./modules/radio.vue')),
  popover: defineAsyncComponent(() => import('./modules/popover.vue')),
  inputNumber: defineAsyncComponent(() => import('./modules/inputNumber.vue')),
  upload: defineAsyncComponent(() => import('./modules/upload.vue')),
  mention: defineAsyncComponent(() => import('./modules/mention.vue')),
  treeSelect: defineAsyncComponent(() => import('./modules/treeSelect.vue')),
  
  autocomplete: asyncElementPlus('ElAutocomplete'),
  input: asyncElementPlus('ElInput'),
  inputTag: asyncElementPlus('ElInputTag'),
  selectV2: asyncElementPlus('ElSelectV2'),
  datePicker: asyncElementPlus('ElDatePicker'),
  timePicker: asyncElementPlus('ElTimePicker'),
  timeSelect: asyncElementPlus('ElTimeSelect'),
  cascader: asyncElementPlus('ElCascader'),
  rate: asyncElementPlus('ElRate'),
  switch: asyncElementPlus('ElSwitch'),
  slider: asyncElementPlus('ElSlider')
};

export default Object.keys(Modules);