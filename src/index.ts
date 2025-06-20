import { App, Plugin } from 'vue';
import FormKit from './FormKit.vue';
import Address from './modules/address.vue';
import Checkbox from './modules/checkbox.vue';
import Select from './modules/select.vue';
import InputNumber from './modules/inputNumber.vue';
import Popover from './modules/popover.vue';
import Radio from './modules/radio.vue';
import RemoteSearchSelect from './modules/remoteSearchSelect.vue';
import Upload from './modules/upload.vue';

import { setConfigure, getConfigure, type configType } from './config.ts';
import { modules, registerModule, type CustomModuleRegistry } from './module-registry';

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

export type { FormKitExposed, ConfigInterface } from './formkit-types'

export { setConfigure, getConfigure }

export { registerModule, modules }

export type { configType, CustomModuleRegistry }

const install: Plugin = (app: App, config?: configType) => {
  if (config) {
    setConfigure(config);
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

const ElementPlusFormkit = {
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
  
  setConfigure,
  getConfigure,
  
  registerModule,
  getModules: () => modules
};

export default ElementPlusFormkit