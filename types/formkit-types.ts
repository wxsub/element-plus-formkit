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
  request?: Function | object;
  handle?: Function;
}

export interface FormKitExposed {
  validate: (openTips?: boolean) => Promise<any>;
  clearValidate: () => void;
}

export interface UploadProgress {
  loaded: number;
  total: number;
}

export type UploadRequester = (
  file: File, 
  options: {
    onProgress?: (progress: UploadProgress) => void
  }
) => Promise<string>;