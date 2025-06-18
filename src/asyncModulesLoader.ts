import { defineAsyncComponent } from 'vue';

export const Modules: Record<string, any> = {
  select: defineAsyncComponent(() => import('./modules/select.vue')),
  remoteSearchSelect: defineAsyncComponent(() => import('./modules/remoteSearchSelect.vue')),
  address: defineAsyncComponent(() => import('./modules/address.vue')),
  checkbox: defineAsyncComponent(() => import('./modules/checkbox.vue')),
  radio: defineAsyncComponent(() => import('./modules/radio.vue')),
  popover: defineAsyncComponent(() => import('./modules/popover.vue')),
  dropdown: defineAsyncComponent(() => import('./modules/dropdown.vue')),
  inputNumber: defineAsyncComponent(() => import('./modules/inputNumber.vue')),
  upload: defineAsyncComponent(() => import('./modules/upload.vue'))
};

export default Object.keys(Modules);