# 模块

组成formkit系统的各个表单组件，以下模块若不是您的预期，您也可以自定义模块[registerModule](/extension-methods.md#registermodule)

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

<formkit
    :config="[
        {
            type: 'select',
            label: '选择器',
            key: 'select1',
            props: { placeholder: '请选择', clearable: true },
            options: [
                { name: '选项一', id: 1 },
                { name: '选项二', id: 2 },
                { name: '选项三', id: 3 }
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
            label: '选择器',
            key: 'select1',
            props: { placeholder: '请选择', clearable: true },
            options: [
                { name: '选项一', id: 1 },
                { name: '选项二', id: 2 },
                { name: '选项三', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```

Select也可通过`requester`字段用于动态获取options

<formkit
    :config="[
        {
            type: 'select',
            label: '选择器',
            key: 'select1',
            props: { placeholder: '请选择', clearable: true },
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
            label: '选择器',
            key: 'select1',
            props: { placeholder: '请选择', clearable: true },
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
import formkit from 'element-plus-formkit';
import { ref, computed } from 'vue';

const dataset = ref({})

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
```
:::

`handler`作为额外的辅助字段，它会在`requester`完成后调用，用于将`requester`的返回值处理成ELselect option可执行的值，当然如果您的`requester`返回值符合ELselect option期望类型便不需要使用它。

### checkbox
在一组备选项中进行多选。

<formkit
    :config="[
        {
            type: 'checkbox',
            label: '多选框',
            key: 'checkbox',
            options: [
                { name: '选项一', id: 1 },
                { name: '选项二', id: 2 },
                { name: '选项三', id: 3 }
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
            label: '多选框',
            key: 'checkbox',
            options: [
                { name: '选项一', id: 1 },
                { name: '选项二', id: 2 },
                { name: '选项三', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```
`showAllCheck`属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

<formkit
    :config="[
        {
            type: 'checkbox',
            label: '全选多选框',
            key: 'checkbox',
            props: { showAllCheck: true },
            options: [
                { name: '选项一', id: 1 },
                { name: '选项二', id: 2 },
                { name: '选项三', id: 3 }
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
            label: '全选多选框',
            key: 'checkbox',
            props: { showAllCheck: true },
            options: [
                { name: '选项一', id: 1 },
                { name: '选项二', id: 2 },
                { name: '选项三', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```

::: tip
当然当您的options需要通过动态获取时，您依旧可以使用`requester`配合`handler`辅助完成，详细参考[select requester](#select)
:::

### radio
在一组备选项中进行单选

<formkit
    :config="[
        {
            type: 'radio',
            label: '单选框',
            key: 'radio',
            options: [
                { name: '选项一', id: 1 },
                { name: '选项二', id: 2 },
                { name: '选项三', id: 3 }
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
            label: '单选框',
            key: 'radio',
            options: [
                { name: '选项一', id: 1 },
                { name: '选项二', id: 2 },
                { name: '选项三', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>

output: {{ dataset.radio }}
```

::: tip
当然当您的options需要通过动态获取时，您依旧可以使用`requester`配合`handler`辅助完成，详细参考[select requester](#select)
:::

### inputNumber
数字输入框, 仅允许输入标准的数字值，可定义范围。详细api参数请参照[ElInputNumber API](https://element-plus.org/zh-CN/component/input-number.html)

<formkit
    :config="[
        {
            type: 'inputNumber',
            label: '步进输入',
            key: 'inputNumber',
            props: {
                min: 0,
                max: 10,
                style: { width: '100%' },
                prefix: '前缀',
                suffix: '后缀'
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
            label: '步进输入',
            key: 'inputNumber',
            props: {
                min: 0,
                max: 10,
                style: { width: '100%' },
                prefix: '前缀',
                suffix: '后缀'
            }
        }
    ]"
    v-model="dataset">
</formkit>

output: {{ dataset.inputNumber }}
```
::: warning
当您需要使用[ElInputNumber 原生API](https://element-plus.org/zh-CN/component/input-number.html)时，需要包裹`props`使用
:::

### address
具有层级的区域地址选择器, 使用此模块需要传入`requester`作为数据源

<formkit
    :config="[
        {
            type: 'address',
            label: '地址选择器',
            key: 'address',
            props: {
                style: { width: '50%' },
                level: 2,
                placeholder: '请选择地址',
                requester: (pid: number) => {
                    return fetchOptions()
                },
                handler: (response: any) => response?.items || []
            }
        }
    ]"
    v-model="dataset">
</formkit>
output: {{ dataset.address }}

```vue
<formkit
    :config="[
        {
            type: 'address',
            label: '地址选择器',
            key: 'address',
            props: {
                style: { width: '50%' },
                level: 2,
                placeholder: '请选择地址',
                requester: (pid: number) => {
                    return fetchOptions()
                },
                handler: (response: any) => response?.items || []
            }
        }
    ]"
    v-model="dataset">
</formkit>
output: {{ dataset.address }}
```

::: warning
区别于select、checkbox、radio等需要动态获取`options`的模块，`address`模块的`requester`，需要包裹`props`使用
:::

### popover
文字弹出层模块选择器

[popover props参数](https://element-plus.org/en-US/component/cascader#cascaderprops)

<formkit
    :config="[
        {
            type: 'popover',
            label: '文字弹出层',
            key: 'popover',
            props: {
                placeholder: '请点击选择',
                props: { multiple: true }
            },
            options: [
                { name: '选项一', id: 1, children: [{ name: '选项一-1', id: 11 }] },
                { name: '选项二', id: 2 },
                { name: '选项三', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'popover',
            label: '文字弹出层',
            key: 'popover',
            props: {
                placeholder: '请点击选择',
                props: { multiple: true }
            },
            options: [
                { name: '选项一', id: 1, children: [{ name: '选项一-1', id: 11 }] },
                { name: '选项二', id: 2 },
                { name: '选项三', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```

::: tip
当然当您的options需要通过动态获取时，您依旧可以使用`requester`配合`handler`辅助完成，详细参考[select requester](#select)
:::

### remoteSearchSelect
具备远程查询功能的select下拉选择器

<formkit
    :config="[
        {
            type: 'remoteSearchSelect',
            label: '远程查询选择器',
            key: 'remoteSearchSelect',
            props: {
                labelKey: 'name',
                valueKey: 'id',
                initialValue: null,
                placeholder: '请输入查询内容',
                requester: (searchName: string) => fetchOptions(),
                handler: (response: any) => response?.items || [],
                onChoose: (item: any) => dataset.onChooseCallback = item
            }
        }
    ]"
    v-model="dataset">
</formkit>

输出 remoteSearchSelect: {{ dataset.remoteSearchSelect }}

输出 onChooseCallback: {{ dataset.onChooseCallback }}

```vue
<formkit
    :config="[
        {
            type: 'remoteSearchSelect',
            label: '远程查询选择器',
            key: 'remoteSearchSelect',
            props: {
                labelKey: 'name',
                valueKey: 'id',
                initialValue: null,
                placeholder: '请输入查询内容',
                requester: (searchName: string) => fetchOptions(),
                handler: (response: any) => response?.items || [],
                onChoose: (item: any) => dataset.onChooseCallback = item
            }
        }
    ]"
    v-model="dataset">
</formkit>
```

通常对于数据进行远程加载的选择器对于默认数据处理通常难以控制，因为通常后端处理数据查询需要接受`item.name`但数据绑定通常为`item.id`，为此我们引入一个新的参数(`initialValue`)来进行控制, 当`initialValue`参数不为空时，我们会在组件完成加载后立即将`initialValue`作为形参调取您提供的`requester`


### rate
评分选择器

<formkit
    :config="[
        {
            type: 'rate',
            label: '评分',
            key: 'rate',
            props: { 'allow-half': false, colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'], size: 'large' }
        }
    ]"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'rate',
            label: '评分',
            key: 'rate',
            props: { 'allow-half': false, colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'], size: 'large' }
        }
    ]"
    v-model="dataset">
</formkit>
```
::: tip
[原生ELinput API](https://element-plus.org/zh-CN/component/rate.html#api)请写入props内
:::

<script setup lang="ts">
import formkit from 'element-plus-formkit';
import { ref, computed } from 'vue';

const dataset = ref({})

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