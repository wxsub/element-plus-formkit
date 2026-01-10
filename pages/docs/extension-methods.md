## registerModule

注册自定义模块，类型：`Function`，该方法用于注册自定义模块，自定义模块的配置项请查阅[Config Api](/config-api.md)。

### 参数

- `type`：自定义模块的类型，类型：`String`
- `config`：自定义模块的配置项，类型：`Function`

### 返回值

- `void`

<formkit
    v-model="dataset"
    :config="[{
        type: 'customModule',
        label: '自定义模块',
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
        label: '自定义模块',
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

const customModule = defineAsyncComponent(() => import('@components/customModule.vue'))

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
当然若是您需要自定义模块的可见性，您可以在自定义模块中通过props接收visible属性，根据visible属性来判断是否显示自定义模块。同时您也可以在main.ts中完成自定义模块的注册
:::

## setConfigure

设置自定义模块的配置项，类型：`Function`，该方法用于设置自定义模块的配置项。

### 参数

- `type`：自定义模块的类型，类型：`String`，可选值：lang、upload。
    - lang：语言配置项，类型：`ElementPlusLocale`
    - upload：上传配置项，类型：`Function`
- `config`：自定义模块的配置项，类型：`Function`

### 返回值

- `void`
### 上传配置项的示例

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
上述代码使您的Formkit组件能够上传文件。

### 多语言语言配置项的示例

```ts
import { setConfigure } from 'element-plus-formkit'
import en from 'element-plus/es/locale/lang/en';

setConfigure('lang', en)
```

::: tip
Formkit语言包依赖于element-plus，更多语言设置请查看[element-plus locale](https://github.com/element-plus/element-plus/tree/dev/packages/locale/lang)
:::

<script setup lang="ts">
import formkit, { registerModule } from 'element-plus-formkit'
import { reactive, defineAsyncComponent } from 'vue'

const dataset = reactive({});

const customModule = defineAsyncComponent(() => import('@components/customModule.vue'))

registerModule("customModule", customModule)
</script>
