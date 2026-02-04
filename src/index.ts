import formkit from '@/formkit.vue';
import Upload from '@/modules/upload.vue';
import Uploader from '@/utils/upload.class';
import Address from '@/modules/address.vue';

import { setConfigure, getConfigure, type configType } from '@/config';
import { modules, registerModule, type CustomModuleRegistry } from '@/module-registry';
import { ElementPlusFormkitPlugin } from 'types/formkit-types';

export type { FormKitExposed, ConfigInterface } from 'types/formkit-types.ts'

export { setConfigure, getConfigure }

export { registerModule, modules }

export type { configType, CustomModuleRegistry }

const pluginObject: ElementPlusFormkitPlugin = {
  setConfigure,
  getConfigure,
  
  registerModule,
  getModules: () => modules.getAllModules()
};

export { pluginObject }

export { Upload, Address, Uploader }

export default formkit;