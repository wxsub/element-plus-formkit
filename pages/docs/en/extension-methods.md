## registerModule

Register a custom module, type: `Function`. This method is used to register custom modules. For configuration options of custom modules, please refer to the [Config API](/config-api.md).

### Parameters

- `type`：Custom module type, type: `String`
- `config`：Custom module configuration item, type: `Function`

### Return value

- `void`

<formkit
    v-model="dataset"
    :config="[{
        type: 'customModule',
        label: 'Custom module',
        key: 'customModule',
    }]"
/>

::: code-tabs
@tab template
```vue
<formkit
    v-model="dataset"
    :config="[{
        type: 'customModule',
        label: 'Custom module',
        key: 'customModule',
    }]"
/>
```

@tab script
```ts
<script setup lang="ts">
import formkit, { registerModule } from 'element-plus-formkit'
import { reactive, defineAsyncComponent } from 'vue'

const dataset = reactive({});

const customModule = defineAsyncComponent(() => import('/components/customModule.vue'))

registerModule("customModule", customModule)
</script>
```
@tab customModule.vue
```vue
    <template>
        <h2>This is customModule</h2>
    </template>

    <script setup lang="ts">
        import { ref } from 'vue'
        const props = defineProps({
            value: {
                type: Object,
                default: () => ({})
            }
        })
    </script>
```
:::

::: tip
Of course, if you need to customize the visibility of a module, you can receive the `visible` property via props within the custom module and determine whether to display it based on this property. You can also register the custom module in `main.ts`.
:::

## setConfigure

Set the configuration item of a custom module, type: `Function`. This method is used to set the configuration item of a custom module.

### Parameters

- `type`：Custom module type, type: `String`, optional values: lang, upload.
    - lang：Language configuration item, type: `ElementPlusLocale`
    - upload：Upload configuration item, type: `Function`
- `config`：Custom module configuration item, type: `Function`

### Return value

- `void`

### Example of Uploading Configuration Items

```ts
import { setConfigure } from 'element-plus-formkit'
import type { UploadRequesterOptions } from 'element-plus-formkit/types/formkit-types'

setConfigure('upload', async (file: File, options: UploadRequesterOptions) => {
    const UploadFormData = new FormData()
    UploadFormData.append('file', file)
    const response = await useAxios().post("/default/oss/upload", UploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
            const total = progressEvent.total || 1,
                loaded = progressEvent.loaded;
            options.onProgress?.({ total, loaded })
        }
    })
    return response
})
```
The above code enables your Formkit component to upload files.

### Example of multilingual language configuration options

```ts
import { setConfigure } from 'element-plus-formkit'
import en from 'element-plus/es/locale/lang/en';

setConfigure('lang', en)
```

::: tip
Formkit language packs depend on element-plus. For additional language settings, please refer to [element-plus locale](https://github.com/element-plus/element-plus/tree/dev/packages/locale/lang).
:::

## Upload Component

The Upload component is a module within Formkit designed for file uploads. It can also be exported and used independently.

### Properties

| Name | Type | Description | Default
| -------- | :----- | :----: | :----: |
| limit | Number | Maximum number of files to upload | 1
| autoUpload | Boolean | Enable automatic uploads | true
| isCustom | Boolean | Enable custom upload | false
| beforeUpload | Function | Pre-upload callback function for preprocessing uploaded files | null
| afterUpload | Function | Post-upload callback function for postprocessing uploaded files | null
| accept | String | Accepted file types, e.g., ‘.jpg,.png’. To accept a unified file type category (e.g., images), use ‘image/*’ | -
| size | Number | Upload button size | 80

<upload :size="100" accept="video/*" :limit="3" :after-upload="(response) => response.data" v-model="dataset.upload" />

::: tip
When using the upload component, if you've already configured upload settings (via the `setConfigure` method), you don't need to repeat the configuration. For the `setConfigure` key identical within your system, you only need to configure it once. Formkit will automatically handle the upload configuration.
:::

::: code-tabs
@tab template
```vue
<upload :size="100" accept="video/*" :limit="3" :after-upload="(response) => response.data" v-model="dataset.upload" />
```

@tab script
```ts
<script setup lang="ts">
import formkit, { setConfigure, Upload, type UploadRequesterOptions } from 'element-plus-formkit'
import { reactive, defineAsyncComponent } from 'vue'

const dataset = reactive({});

// This section provides an example of upload configuration settings. If you have already configured upload settings in your project, you may skip this section.
setConfigure('upload', async (file: File, options: UploadRequesterOptions) => {
    const url = URL.createObjectURL(file)
    return new Promise((r, j) => {
        setTimeout(() => {
           r({
                code: 200,
                data: url || "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
           })
        }, 2000)
    })
})
</script>
```
:::

## Uploader Methods

Internal upload execution methods within the Uploader component, type: `Function`. You can export and use them individually. They include the following methods:

| Method Name | Description | Type | Parameters | Return Value
| -------- | :----- | :----- | :----: | :----: |
| constructor | Constructor | Function | `requester?: UploadRequester` Upload requester | null` | void
| isValidFileType | Validates file type | Function | `file: File, accept: string` (comma-separated file types, e.g., ‘video/*,image/*’) | boolean
| action | Executes upload operation | Function | `file: File`, a File object | void
| destroy | Destroys the upload component | Function | `void` | void
| setProgressListener | Sets the upload progress listener | Function | `(progress: number) => void` | void
| setCompleteListener | Sets the upload completion listener | Function | `(response: any) => void` | void
| setErrorListener | Sets the upload error listener | Function | `(err: any) => void` | void

```ts
import { Uploader } from 'element-plus-formkit'

const upload = new Uploader()

upload.action(File)

upload.setProgressListener((progress: number) => console.log('Upload progress:', progress))
upload.setCompleteListener(async (response: any) => {
    console.log('Upload complete:', response)
})
upload.setErrorListener((err) => {
    console.error('Upload error:', err)
    upload.destroy()
})
```

## Address Component

The address component is a module within Formkit designed for selecting hierarchical regional addresses. It can also be exported for standalone use.

::: tip
The core of the `address` module utilizes `ELCascader`, allowing parameters to be passed to [ELCascader Attributes](https://element-plus.org/zh-CN/component/cascader#cascader-attributes).
:::

### Properties

| Name | Type | Description | Default
| -------- | :----- | :----: | :----: |
| level | Number | Hierarchical levels selectable by the address picker. Note: level starts at 0. Example: 0=>Province selection, 1=>Province/City selection | 1
| cascaderProps | Object | When address uses ELCascader, cascaderProps contains parameters to pass to [ELCascader cascaderprops](https://element-plus.org/zh-CN/component/cascader#cascaderprops) | {}
| valueKey | String | Key name uniquely identifying the value. Required when binding an object type. | id
| labelKey | String | Specifies the option label as a property value of the option object. | name

<Address
    :level="1"
    v-model="dataset.address"
    :requester="(pid: number) => {
        return fetchOptions()
    }"
    :handler="(response: any) => response?.items || []",
    placeholder='Please select an address'
/>

::: code-tabs
@tab template
```vue
<Address
    :level="1"
    v-model="dataset.address"
    :requester="(pid: number) => {
        return fetchOptions()
    }"
    :handler="(response: any) => response?.items || []",
    placeholder='Please select an address'
/>
```

@tab script
```ts
<script setup lang="ts">
import formkit, { Address } from 'element-plus-formkit'
import { reactive, defineAsyncComponent } from 'vue'

const dataset = reactive({});

function fetchOptions() {
    return new Promise((r, j) => {
        setTimeout(() => {
           r({
                code: 200,
                items: [
                    { name: 'Option One', id: 1 },
                    { name: 'Option Two', id: 2 },
                    { name: 'Option Three', id: 3 }
                ]
           })
        }, 2000)
    })
}
```
:::

<script setup lang="ts">
import formkit, { registerModule, setConfigure, Upload, Address, type UploadRequesterOptions } from 'element-plus-formkit'
import { reactive, defineAsyncComponent } from 'vue'

const dataset = reactive({});

const customModule = defineAsyncComponent(() => import('@components/customModule.vue'))

registerModule("customModule", customModule)

setConfigure('upload', async (file: File, options: UploadRequesterOptions) => {
    const url = URL.createObjectURL(file)
    return new Promise((r, j) => {
        setTimeout(() => {
           r({
                code: 200,
                data: url || "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
           })
        }, 2000)
    })
})

function fetchOptions() {
    return new Promise((r, j) => {
        setTimeout(() => {
           r({
                code: 200,
                items: [
                    { name: 'Option One', id: 1 },
                    { name: 'Option Two', id: 2 },
                    { name: 'Option Three', id: 3 }
                ]
           })
        }, 2000)
    })
}
</script>
