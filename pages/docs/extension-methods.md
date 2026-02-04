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

## Upload组件

Upload组件是Formkit的一个模块，用于上传文件。您也可以单独将其导出进行使用。

### 属性

| 名称 | 类型 | 说明 | 默认
| -------- | :----- | :----: | :----: |
| limit | Number | 上传文件数量限制 | 1
| autoUpload | Boolean | 是否自动上传 | true
| isCustom | Boolean | 是否自定义上传 | false
| beforeUpload | Function | 上传前的回调函数，用于对上传文件进行预处理 | null
| afterUpload | Function | 上传后的回调函数，用于对上传文件进行后续处理 | null
| accept | String | 接受的文件类型，例如：'.jpg,.png', 若要统一某一类文件类型，例如图片，则可以写为'image/*' | -
| size | Number | 上传按钮的大小 | 80

<upload :size="100" accept="video/*" :limit="3" :after-upload="(response) => response.data" v-model="dataset.upload" />

::: tip
使用upload组件时，若您已经设置了上传配置项（通过`setConfigure`方法设置），您无需重复设置上传配置项在您的系统内相同的`setConfigure`键您只需要配置一次即可，Formkit会自动处理上传配置项。
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

// 此处为上传配置项的示例，若您在您的项目中已经设置了上传配置项，可忽略。
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

## Uploader方法

Uploader组件内部上传执行方法，类型：`Function`，您可以将其单独导出使用，它包含以下方法：

| 方法名称 | 说明 | 类型 | 参数 | 返回值
| -------- | :----- | :----- | :----: | :----: |
| constructor | 构造函数 | Function | `requester?: UploadRequester`上传请求器 | null` | void
| isValidFileType | 判断文件是否符合上传类型 | Function | `file: File, accept: string`（逗号分隔的文件类型，例如：'video/*,image/*'） | boolean
| action | 执行上传操作 | Function | `file: File`，File类型的文件 | void
| destroy | 销毁上传组件 | Function | `void` | void
| setProgressListener | 设置上传进度监听 | Function | `(progress: number) => void` | void
| setCompleteListener | 设置上传完成监听 | Function | `(response: any) => void` | void
| setErrorListener | 设置上传错误监听 | Function | `(err: any) => void` | void

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

## Address组件

address组件是Formkit的一个模块，用于选择具有层级的区域地址。您也可以单独将其导出进行使用。

::: tip
`address`模块的主体使用了`ELCascader`，我们可以将需要的参数传递给[ELCascader Attributes](https://element-plus.org/zh-CN/component/cascader#cascader-attributes)的参数。
:::

### 属性

| 名称 | 类型 | 说明 | 默认
| -------- | :----- | :----: | :----: |
| level | Number | 地址选择器可选择的层级,注意level是从0开始，例如: 0=>省份选择、1=>省份、城市选择 | 1
| cascaderProps | Object | address使用了ELCascader，cascaderProps参数为需要传递给[ELCascader cascaderprops](https://element-plus.org/zh-CN/component/cascader#cascaderprops)的参数 | {}
| valueKey | String | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | id
| labelKey | String | 指定选项标签为选项对象的某个属性值 | name

<Address
    :level="1"
    v-model="dataset.address"
    :requester="(pid: number) => {
        return fetchOptions()
    }"
    :handler="(response: any) => response?.items || []",
    placeholder='请选择地址'
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
    placeholder='请选择地址'
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
                { name: '选择项一', id: 1 },
                { name: '选择项二', id: 2 },
                { name: '选择项三', id: 3 }
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
                { name: '选择项一', id: 1 },
                { name: '选择项二', id: 2 },
                { name: '选择项三', id: 3 }
            ]
           })
        }, 2000)
    })
}
</script>
