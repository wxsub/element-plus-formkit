import { defineAsyncComponent } from 'vue';
import type { Component } from 'vue';

const asyncElementPlus = (componentName: string): Component => {
  return defineAsyncComponent(() => 
    import('element-plus').then(module => (module as any)[componentName])
  )
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
  
  input: asyncElementPlus('ElInput'),
  datePicker: asyncElementPlus('ElDatePicker'),
  timePicker: asyncElementPlus('ElTimePicker'),
  timeSelect: asyncElementPlus('ElTimeSelect'),
  cascader: asyncElementPlus('ElCascader'),
  rate: asyncElementPlus('ElRate'),
  switch: asyncElementPlus('ElSwitch'),
  slider: asyncElementPlus('ElSlider'),
  treeSelect: asyncElementPlus('ElTreeSelect')
};

export default Object.keys(Modules);