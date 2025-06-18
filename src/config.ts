import { ref, reactive, type Ref } from 'vue';

export interface FormKitGlobalConfig {
  uploadUrl?: string;
  apiAdapter?: (url: string, data?: any) => Promise<any>;
}

const defaultConfig: FormKitGlobalConfig = {
  uploadUrl: '/default/oss/upload',
  apiAdapter: async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.json();
  }
};

const globalConfig: Ref<FormKitGlobalConfig> = ref(defaultConfig);

export function setFormKitConfig(config: Partial<FormKitGlobalConfig>) {
  globalConfig.value = { ...globalConfig.value, ...config };
}

export function getFormKitConfig(): FormKitGlobalConfig {
  return globalConfig.value;
}

export function createUploader(): FileUploader {
  const config = getFormKitConfig();
  return new FileUploader(config.uploadUrl, config.apiAdapter);
}