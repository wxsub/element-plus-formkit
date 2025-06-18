import { App, Plugin, defineComponent, Component } from 'vue';
import FormKit from './FormKit.vue';
import Address from './modules/address.vue';
import Checkbox from './modules/checkbox.vue';
import Select from './modules/select.vue';
import InputNumber from './modules/inputNumber.vue';
import Popover from './modules/popover.vue';
import Radio from './modules/radio.vue';
import RemoteSearchSelect from './modules/remoteSearchSelect.vue';
import Upload from './modules/upload.vue';

import { setFormKitConfig, getFormKitConfig, createUploader, type FormKitGlobalConfig } from './config';
import { moduleRegistry, registerFormKitModule, type CustomModuleRegistry } from './module-registry';

export {
  FormKit,
  Address,
  Checkbox,
  Select,
  InputNumber,
  Popover,
  Radio,
  RemoteSearchSelect,
  Upload
};

export type { FormKitExposed, ConfigInterface } from './FormKit.vue'

export { setFormKitConfig, getFormKitConfig, createUploader }

export { registerFormKitModule, moduleRegistry }

export type { FormKitGlobalConfig, CustomModuleRegistry }

const install: Plugin = (app: App, config?: FormKitGlobalConfig) => {
  if (config) {
    setFormKitConfig(config);
  }
  
  app.component('FormKit', FormKit);
  app.component('FormKitAddress', Address);
  app.component('FormKitCheckbox', Checkbox);
  app.component('FormKitSelect', Select);
  app.component('FormKitInputNumber', InputNumber);
  app.component('FormKitPopover', Popover);
  app.component('FormKitRadio', Radio);
  app.component('FormKitRemoteSearchSelect', RemoteSearchSelect);
  app.component('FormKitUpload', Upload);
};

const elementPlusFormkit = {
  install,
  FormKit,
  Address,
  Checkbox,
  Select,
  InputNumber,
  Popover,
  Radio,
  RemoteSearchSelect,
  Upload,
  
  setConfig: setFormKitConfig,
  getConfig: getFormKitConfig,
  createUploader,
  
  registerModule: registerFormKitModule,
  getModuleRegistry: () => moduleRegistry
};

export default elementPlusFormkit