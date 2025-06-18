import { Component } from 'vue';

declare module 'formkit' {
  export const FormKit: Component;
  export const FormKitAddress: Component;
  export const FormKitCheckbox: Component;
  export const FormKitDropdown: Component;
  export const FormKitSelect: Component;
  export const FormKitInputNumber: Component;
  export const FormKitPopover: Component;
  export const FormKitRadio: Component;
  export const FormKitRemoteSearchSelect: Component;
  export const FormKitUpload: Component;
}