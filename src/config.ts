import { ref, type Ref } from 'vue';
import type { UploadRequester, ElementPlusLocale } from 'types/formkit-types';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

export interface configType {
  upload?: UploadRequester | null;
  lang: ElementPlusLocale;
}

const defaultConfig: configType = {
  upload: null,
  lang: zhCn as ElementPlusLocale
};

const globalConfig: Ref<configType> = ref(defaultConfig);

export function setConfigure<K extends keyof configType>(
  name: K,
  config: configType[K]
) {
  globalConfig.value[name] = config;
}

export function getConfigure<T extends keyof configType>(
  name: T
): configType[T] {
  return globalConfig.value[name];
}