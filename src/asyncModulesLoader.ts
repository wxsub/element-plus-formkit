import { defineAsyncComponent } from 'vue';
import type { Component } from 'vue';

export const Modules: Record<string, Component> = {
  select: defineAsyncComponent(() => import('./modules/select.vue')),
  remoteSearchSelect: defineAsyncComponent(() => import('./modules/remoteSearchSelect.vue')),
  address: defineAsyncComponent(() => import('./modules/address.vue')),
  checkbox: defineAsyncComponent(() => import('./modules/checkbox.vue')),
  radio: defineAsyncComponent(() => import('./modules/radio.vue')),
  popover: defineAsyncComponent(() => import('./modules/popover.vue')),
  inputNumber: defineAsyncComponent(() => import('./modules/inputNumber.vue')),
  upload: defineAsyncComponent(() => import('./modules/upload.vue')),
  
  input: defineAsyncComponent(() => import('element-plus/es/components/input/index.mjs').then(m => m.ElInput)),
  inputTag: defineAsyncComponent(() => import('element-plus/es/components/input-tag/index.mjs').then(m => m.ElInputTag)),
  selectV2: defineAsyncComponent(() => import('element-plus/es/components/select-v2/index.mjs').then(m => m.ElSelectV2)),
  datePicker: defineAsyncComponent(() => import('element-plus/es/components/date-picker/index.mjs').then(m => m.ElDatePicker)),
  timePicker: defineAsyncComponent(() => import('element-plus/es/components/time-picker/index.mjs').then(m => m.ElTimePicker)),
  timeSelect: defineAsyncComponent(() => import('element-plus/es/components/time-select/index.mjs').then(m => m.ElTimeSelect)),
  cascader: defineAsyncComponent(() => import('element-plus/es/components/cascader/index.mjs').then(m => m.ElCascader)),
  rate: defineAsyncComponent(() => import('element-plus/es/components/rate/index.mjs').then(m => m.ElRate)),
  switch: defineAsyncComponent(() => import('element-plus/es/components/switch/index.mjs').then(m => m.ElSwitch)),
  slider: defineAsyncComponent(() => import('element-plus/es/components/slider/index.mjs').then(m => m.ElSlider)),
  treeSelect: defineAsyncComponent(() => import('element-plus/es/components/tree-select/index.mjs').then(m => m.ElTreeSelect))
};

export default Object.keys(Modules);