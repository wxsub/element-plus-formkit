import { ref, type Ref } from 'vue';

export interface configType {
  uploadUrl?: string;
  addressNetWork?: Promise<any>
}

const defaultConfig: configType = {
  uploadUrl: ''
};

const globalConfig: Ref<configType> = ref(defaultConfig);

export function setConfigure(config: Partial<configType>) {
  globalConfig.value = { ...globalConfig.value, ...config };
}

export function getConfigure(): configType {
  return globalConfig.value;
}