import { FormItemRule } from "element-plus"

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