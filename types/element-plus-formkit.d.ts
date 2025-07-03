declare module 'element-plus-formkit' {
  import { App } from 'vue';
  import { Component } from 'vue';
  import { ElementPlusFormkitPlugin } from './formkit-types';
  import FormKitComponent from '@/formkit.vue';
  import * as formkitTypes from './formkit-types';

  const ElementPlusFormkit: ElementPlusFormkitPlugin;
  
  export default ElementPlusFormkit;
  
  export const formkit: typeof FormKitComponent;
  export const Upload: Component;
  
  export const setConfigure: (key: string, value: any) => void;
  export const getConfigure: (key: string) => any;
  export const registerModule: (name: string, component: Component) => void;

  export type Instance = InstanceType<typeof FormKitComponent>;
  
  export type {
    FormItemRule,
    ConfigInterface,
    FormKitExposed,
    UploadProgress,
    UploadProgressHandler,
    UploadRequesterOptions,
    UploadRequester,
    ElementPlusFormkitPlugin
  } from './formkit-types';
}