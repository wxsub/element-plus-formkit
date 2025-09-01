import formkit from '@/formkit.vue';
import Upload from '@/modules/upload.vue';

import { setConfigure, getConfigure, type configType } from '@/config';
import { modules, registerModule, type CustomModuleRegistry } from '@/module-registry';
import { ElementPlusFormkitPlugin } from 'types/formkit-types';

export type { FormKitExposed, ConfigInterface } from 'types/formkit-types.ts'

export { setConfigure, getConfigure }

export { registerModule, modules }

export type { configType, CustomModuleRegistry }

const pluginObject: ElementPlusFormkitPlugin = {
  Upload,
  
  setConfigure,
  getConfigure,
  
  registerModule,
  getModules: () => modules.getAllModules()
};

export { pluginObject }

export default formkit;