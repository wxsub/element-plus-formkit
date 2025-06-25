declare module 'element-plus-formkit' {
  import { App, Plugin } from 'vue';
  import FormKitComponent from '@/formkit.vue';
  
  const ElementPlusFormkit: Plugin & {
    install: (app: App) => void;
    FormKit: typeof FormKitComponent;
    Address: typeof import('@/modules/address.vue').default;
    Checkbox: typeof import('@/modules/checkbox.vue').default;
    Select: typeof import('@/modules/select.vue').default;
    InputNumber: typeof import('@/modules/inputNumber.vue').default;
    Popover: typeof import('@/modules/popover.vue').default;
    Radio: typeof import('@/modules/radio.vue').default;
    RemoteSearchSelect: typeof import('@/modules/remoteSearchSelect.vue').default;
    Upload: typeof import('@/modules/upload.vue').default;
    
    setConfigure: typeof import('@/config').setConfigure;
    getConfigure: typeof import('@/config').getConfigure;
    registerModule: typeof import('@/module-registry').registerModule;
  };
  
  export default ElementPlusFormkit;
  
  export const FormKit: typeof FormKitComponent;
  export type Instance = InstanceType<typeof FormKitComponent>
  export const Address: any;
  export const Checkbox: any;
  export const Select: any;
  export const InputNumber: any;
  export const Popover: any;
  export const Radio: any;
  export const RemoteSearchSelect: any;
  export const Upload: any;
  
  export { setConfigure, getConfigure, registerModule };
  
  export * from '@/types/formkit-types';
}