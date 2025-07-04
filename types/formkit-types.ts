import { Plugin } from 'vue';
import { ConfigProviderProps } from 'element-plus';
import type { Component } from 'vue';

export type ValidSize = '' | 'small' | 'default' | 'large'

export type ElementPlusLocale = NonNullable<ConfigProviderProps['locale']>;

export interface FormItemRule {
  trigger?: string | string[];
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
  len?: number;
  pattern?: RegExp;
  validator?: (rule: any, value: any, callback: (error?: Error) => void) => void;
}

export interface ConfigInterface {
  type?: string;
  key: string;
  span?: number;
  labelWidth?: number;
  label?: string;
  prefix?: string;
  disabled?: boolean;
  visible?: boolean | object | Array<object>;
  hint?: string;
  options?: Array<object>;
  rules?: Array<FormItemRule>;
  events?: object;
  props?: object;
  requester?: Function | object;
  handler?: Function;
}

export interface FormKitExposed {
  validate: (openTips?: boolean) => Promise<any>;
  clearValidate: () => void;
}

export interface UploadProgress {
  loaded: number;
  total: number;
}

export type UploadProgressHandler = (progress: UploadProgress) => void;

export interface UploadRequesterOptions {
  onProgress?: UploadProgressHandler;
}

export type UploadRequester = (
  file: File, 
  options: UploadRequesterOptions
) => Promise<string>;

export type ElementPlusFormkitPlugin = Plugin & {
  formkit: Component;
  Upload: Component;
  setConfigure: (...args: any[]) => void;
  getConfigure: (...args: any[]) => any;
  registerModule: (...args: any[]) => void;
  getModules: () => Record<string, Component>;
};