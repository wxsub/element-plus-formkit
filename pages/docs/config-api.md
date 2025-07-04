# 组件配置项(Component Configuration Items)

## config.type
type字段用于控制formkit加载相关的模块，字段类型：`String`,下面将介绍type相关合法值。

The type field is used to control the module loaded by the formkit, field type: `String`, the legal values associated with type are described below.

### input
输入框
<formkit
    :config="[
        {
            type: 'input',
            label: '姓名 (Name)',
            key: 'password',
            props: { placeholder: '请输入姓名', clearable: true }
        }
    ]"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'input',
            label: '姓名 (Name)',
            key: 'password',
            props: { placeholder: '请输入姓名', clearable: true }
        }
    ]"
    v-model="dataset">
</formkit>
```
::: tip
[原生ELinput API](https://element-plus.org/zh-CN/component/input.html#api)请写入props内
:::

### select
select选择器, 当选项过多时，使用下拉菜单展示并选择内容。

select selector, when there are too many options, use the drop-down menu to display and select the content.

<formkit
    :config="[
        {
            type: 'select',
            label: 'Selector',
            key: 'select1',
            props: { placeholder: 'Pls select', clearable: true },
            options: [
                { name: 'Selector item one', id: 1 },
                { name: 'Selector item two', id: 2 },
                { name: 'Selector item three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'select',
            label: 'Selector',
            key: 'select1',
            props: { placeholder: 'Pls select', clearable: true },
            options: [
                { name: 'Selector item one', id: 1 },
                { name: 'Selector item two', id: 2 },
                { name: 'Selector item three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```

Select也可通过`requester`字段用于动态获取options

Select can also be used to dynamically fetch options through the `requester` field.

<formkit
    :config="[
        {
            type: 'select',
            label: 'Selector',
            key: 'select1',
            props: { placeholder: 'Pls select', clearable: true },
            requester: fetchOptions,
            handler: (response: any) => response?.items || []
        }
    ]"
    v-model="dataset">
</formkit>

::: code-tabs
@tab Template
```vue
<formkit
    :config="[
        {
            type: 'select',
            label: 'Selector',
            key: 'select1',
            props: { placeholder: 'Pls select', clearable: true },
            requester: fetchOptions,
            handler: (response: any) => response?.items || []
        }
    ]"
    v-model="dataset">
</formkit>
```

@tab TypeScript
```ts
<script setup lang="ts">
import { ref, computed } from 'vue';

const dataset = ref({})

function fetchOptions() {
    return new Promise((r, j) => {
        setTimeout(() => {
           r({
            code: 200,
            items: [
                { name: 'Selector item one', id: 1 },
                { name: 'Selector item two', id: 2 },
                { name: 'Selector item three', id: 3 }
            ]
           })
        }, 2000)
    })
}
</script>
```
:::

`handler`作为额外的辅助字段，它会在`requester`完成后调用，用于将`requester`的返回值处理成ELselect option可执行的值，当然如果您的`requester`返回值符合ELselect option期望类型便不需要使用它。

The `handler` is an additional helper field that is called after the `requester` completes, and is used to process the return value of the `requester` into a value that can be executed by the ELselect option, although it is not necessary to use it if your `requester` returns a value of the type that is expected by the ELselect option.

### checkbox
在一组备选项中进行多选。

Make multiple choices in a set of alternatives.

<formkit
    :config="[
        {
            type: 'checkbox',
            label: 'Checkbox',
            key: 'checkbox',
            options: [
                { name: 'Selector item one', id: 1 },
                { name: 'Selector item two', id: 2 },
                { name: 'Selector item three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'checkbox',
            label: 'Checkbox',
            key: 'checkbox',
            options: [
                { name: 'Selector item one', id: 1 },
                { name: 'Selector item two', id: 2 },
                { name: 'Selector item three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```
`showAllCheck`属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

The `showAllCheck` attribute is used to indicate the indeterminate state of the checkbox, and is generally used to achieve the effect of full check.

<formkit
    :config="[
        {
            type: 'checkbox',
            label: 'Checkbox',
            key: 'checkbox',
            props: { showAllCheck: true },
            options: [
                { name: 'Selector item one', id: 1 },
                { name: 'Selector item two', id: 2 },
                { name: 'Selector item three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>

output: {{ dataset.checkbox }}

```vue
<formkit
    :config="[
        {
            type: 'checkbox',
            label: 'Checkbox',
            key: 'checkbox',
            props: { showAllCheck: true },
            options: [
                { name: 'Selector item one', id: 1 },
                { name: 'Selector item two', id: 2 },
                { name: 'Selector item three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```

::: tip
当然当您的options需要通过动态获取时，您依旧可以使用`requester`配合`handler`辅助完成，详细参考[select requester](#select)

Of course, when your options need to be fetched dynamically, you can still use `requester` with the help of `handler` to accomplish this [select requester](#select)
:::

### radio
在一组备选项中进行单选

Make a single choice from a set of alternatives

<formkit
    :config="[
        {
            type: 'radio',
            label: 'Radio',
            key: 'radio',
            options: [
                { name: 'Selector item one', id: 1 },
                { name: 'Selector item two', id: 2 },
                { name: 'Selector item three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>

output: {{ dataset.radio }}

```vue
<formkit
    :config="[
        {
            type: 'radio',
            label: 'Radio',
            key: 'radio',
            options: [
                { name: 'Selector item one', id: 1 },
                { name: 'Selector item two', id: 2 },
                { name: 'Selector item three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```

::: tip
当然当您的options需要通过动态获取时，您依旧可以使用`requester`配合`handler`辅助完成，详细参考[select requester](#select)

Of course, when your options need to be fetched dynamically, you can still use `requester` with the help of `handler` to accomplish this [select requester](#select)
:::

### inputNumber
数字输入框, 仅允许输入标准的数字值，可定义范围。详细api参数请参照[ElInputNumber API](https://element-plus.org/zh-CN/component/input-number.html)

Numeric input box, only standard numeric values are allowed, range can be defined. Please refer to [ElInputNumber API](https://element-plus.org/zh-CN/component/input-number.html) for detailed api parameters.

<formkit
    :config="[
        {
            type: 'inputNumber',
            label: 'InputNumber',
            key: 'inputNumber',
            props: {
                min: 0,
                max: 10,
                style: { width: '100%' },
                prefix: 'prefix',
                suffix: 'suffix'
            }
        }
    ]"
    v-model="dataset">
</formkit>

output: {{ dataset.inputNumber }}

```vue
<formkit
    :config="[
        {
            type: 'inputNumber',
            label: 'InputNumber',
            key: 'inputNumber',
            props: {
                min: 0,
                max: 10,
                style: { width: '100%' },
                prefix: 'prefix',
                suffix: 'suffix'
            }
        }
    ]"
    v-model="dataset">
</formkit>
```
::: warning
当您需要使用[ElInputNumber 原生API](https://element-plus.org/zh-CN/component/input-number.html)时，需要包裹`props`使用

When you need to use the [ElInputNumber native API](https://element-plus.org/zh-CN/component/input-number.html), you need to wrap `props` to use the
:::

### address
具有层级的区域地址选择器, 使用此模块需要传入`requester`作为数据源

Hierarchical zone address selector, using this module requires passing in `requester` as the data source.

<formkit
    :config="[
        {
            type: 'address',
            label: 'Address',
            key: 'address',
            props: {
                style: { width: '50%' },
                level: 2,
                placeholder: 'Pls Select Address',
                requester: (pid: number) => {
                    return fetchOptions()
                },
                handler: (response: any) => response?.items || []
            }
        }
    ]"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'address',
            label: 'Address',
            key: 'address',
            props: {
                style: { width: '50%' },
                level: 2,
                placeholder: 'Pls Select Address',
                requester: (pid: number) => {
                    // return useAxios().get(`/default/region/agent-regions?pid=${pid}`)
                    return fetchOptions()
                },
                handler: (response: any) => response?.items || []
            }
        }
    ]"
    v-model="dataset">
</formkit>
```

::: warning
区别于select、checkbox、radio等需要动态获取`options`的模块，`address`模块的`requester`，需要包裹`props`使用

Unlike select, checkbox, radio, and other modules that need to get `options` dynamically, the `address` module has a `requester` that needs to be wrapped around `props` to be used.
:::

### popover
文字弹出层

Text Popup Layer

<formkit
    :config="[
        {
            type: 'popover',
            label: 'popover',
            key: 'popover',
            props: {
                placeholder: 'Pls Click To Select'
            },
            options: [
                { name: 'Selector item one', id: 1 },
                { name: 'Selector item two', id: 2 },
                { name: 'Selector item three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>

::: tip
当然当您的options需要通过动态获取时，您依旧可以使用`requester`配合`handler`辅助完成，详细参考[select requester](#select)

Of course, when your options need to be fetched dynamically, you can still use `requester` with the help of `handler` to accomplish this [select requester](#select)
:::

### remoteSearchSelect
具备远程查询功能的select下拉选择器

Select dropdown selector with remote query functionality

<formkit
    :config="[
        {
            type: 'remoteSearchSelect',
            label: 'Remote Search Select',
            key: 'remoteSearchSelect',
            props: {
                labelKey: 'name',
                valueKey: 'id',
                initialValue: null,
                placeholder: 'Click To Search Select',
                requester: (searchName: string) => fetchOptions(),
                handler: (response: any) => response?.items || [],
                onChoose: (item: any) => dataset.onChooseCallback = item
            }
        }
    ]"
    v-model="dataset">
</formkit>

output remoteSearchSelect: {{ dataset.remoteSearchSelect }}

output onChooseCallback: {{ dataset.onChooseCallback }}

```vue
<formkit
    :config="[
        {
            type: 'remoteSearchSelect',
            label: 'Remote Search Select',
            key: 'remoteSearchSelect',
            props: {
                labelKey: 'name',
                valueKey: 'id',
                initialValue: null,
                placeholder: 'Click To Search Select',
                requester: (searchName: string) => {
                    // return useAxios().get('/default/xxx', { params: { searchName } })
                    return fetchOptions()
                },
                handler: (response: any) => response?.items || [],
                onChoose: (item: any) => dataset.value.additionalValue = item.name
            }
        }
    ]"
    v-model="dataset">
</formkit>
```

通常对于数据进行远程加载的选择器对于默认数据处理通常难以控制，因为通常后端处理数据查询需要接受`item.name`但数据绑定通常为`item.id`，为此我们引入一个新的参数(`initialValue`)来进行控制, 当`initialValue`参数不为空时，我们会在组件完成加载后立即将`initialValue`作为形参调取您提供的`requester`

Usually selectors that load data remotely are difficult to control the default data handling, because usually the backend handles the data query by accepting `item.name` but the data binding is usually `item.id`, for this reason we introduce a new parameter (`initialValue`) for this purpose, when `initialValue` is not empty, we will call the `requester` you provide as a form parameter as soon as the component is finished loading. When the `initialValue` parameter is not null, we will use `initialValue` as a formal parameter to fetch your `requester` as soon as the component finishes loading.


<script setup lang="ts">
import { ref, computed } from 'vue';

const dataset = ref({})

function fetchOptions() {
    return new Promise((r, j) => {
        setTimeout(() => {
           r({
            code: 200,
            items: [
                { name: 'Selector item one', id: 1 },
                { name: 'Selector item two', id: 2 },
                { name: 'Selector item three', id: 3 }
            ]
           })
        }, 2000)
    })
}
</script>