import { ref, reactive, type Ref } from 'vue';

export interface configType {
  uploadUrl?: string;
  addressNetWork?: Promise
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

export function createUploader(): FileUploader {
  const config = getConfigure();
  return new FileUploader(config.uploadUrl);
}