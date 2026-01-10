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

<script setup lang="ts">
import formkit, { registerModule } from 'element-plus-formkit'
import { reactive, defineAsyncComponent } from 'vue'

const dataset = reactive({});

const customModule = defineAsyncComponent(() => import('/components/customModule.vue'))

registerModule("customModule", customModule)
</script>
