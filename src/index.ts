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

export type { FormKitExposed } from './FormKit.vue'

const install: Plugin = (app: App) => {
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

export default {
  install,
  FormKit,
  Address,
  Checkbox,
  Select,
  InputNumber,
  Popover,
  Radio,
  RemoteSearchSelect,
  Upload
}