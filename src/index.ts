import { App } from 'vue';
import formkit from '@/formkit.vue';
import Upload from '@/modules/upload.vue';

import { setConfigure, getConfigure, type configType } from '@/config';
import { modules, registerModule, type CustomModuleRegistry } from '@/module-registry';
import { ElementPlusFormkitPlugin } from 'types/formkit-types';

export { formkit, Upload }

export type { FormKitExposed, ConfigInterface } from 'types/formkit-types.ts'

export { setConfigure, getConfigure }

export { registerModule, modules }

export type { configType, CustomModuleRegistry }

const install = (app: App) => {
  app.component('formkit', formkit);
  app.component('formkitUpload', Upload);
};

const pluginObject: ElementPlusFormkitPlugin = {
  install,
  formkit,
  Upload,
  
  setConfigure,
  getConfigure,
  
  registerModule,
  getModules: () => modules.getAllModules()
};

export default pluginObject;