import { App, Plugin } from 'vue';
import formkit from '@/formkit.vue';
import Address from '@/modules/address.vue';
import Checkbox from '@/modules/checkbox.vue';
import Select from '@/modules/select.vue';
import InputNumber from '@/modules/inputNumber.vue';
import Popover from '@/modules/popover.vue';
import Radio from '@/modules/radio.vue';
import RemoteSearchSelect from '@/modules/remoteSearchSelect.vue';
import Upload from '@/modules/upload.vue';

import { setConfigure, getConfigure, type configType } from '@/config';
import { modules, registerModule, type CustomModuleRegistry } from '@/module-registry';

export {
  formkit,
  Address,
  Checkbox,
  Select,
  InputNumber,
  Popover,
  Radio,
  RemoteSearchSelect,
  Upload
};

export type { FormKitExposed, ConfigInterface } from 'types/formkit-types.ts'

export { setConfigure, getConfigure }

export { registerModule, modules }

export type { configType, CustomModuleRegistry }

type ElementPlusFormkitType = {
  install: Plugin;
  formkit: typeof formkit;
  Address: typeof Address;
  Checkbox: typeof Checkbox;
  Select: typeof Select;
  InputNumber: typeof InputNumber;
  Popover: typeof Popover;
  Radio: typeof Radio;
  RemoteSearchSelect: typeof RemoteSearchSelect;
  Upload: typeof Upload;
  setConfigure: typeof setConfigure;
  getConfigure: typeof getConfigure;
  registerModule: typeof registerModule;
  getModules: () => typeof modules;
};

const install: Plugin = (app: App) => {  
  app.component('formkit', formkit);
  app.component('FormkitAddress', Address);
  app.component('FormkitCheckbox', Checkbox);
  app.component('FormkitSelect', Select);
  app.component('FormkitInputNumber', InputNumber);
  app.component('FormkitPopover', Popover);
  app.component('FormkitRadio', Radio);
  app.component('FormkitRemoteSearchSelect', RemoteSearchSelect);
  app.component('FormkitUpload', Upload);
};

const pluginObject: ElementPlusFormkitType = {
  install,
  formkit,
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

export default pluginObject;