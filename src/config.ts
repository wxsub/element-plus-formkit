import { ref, type Ref } from 'vue';
import type { UploadRequester } from 'types/formkit-types';

export interface configType {
  upload?: UploadRequester | null;
}

const defaultConfig: configType = {
  upload: null
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