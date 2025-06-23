import { ref, type Ref } from 'vue';

export interface configType {
  uploadUrl?: string;
  addressNetWork?: Promise<any>;
  [key: string]: any; // Add an index signature to allow dynamic property access
}

const defaultConfig: configType = {
  uploadUrl: ''
};

const globalConfig: Ref<configType> = ref(defaultConfig);

export function setConfigure(config: Partial<configType>) {
  globalConfig.value = { ...globalConfig.value, ...config };
}

export function getConfigure(name: string): configType {
  return globalConfig.value[name];
}