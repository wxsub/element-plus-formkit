# 组件配置项(Component Configuration Items)

以下配置项针对于config数组中的每个对象

## config.type
type字段用于控制formkit加载相关的模块，字段类型：`String`,下面将介绍type相关合法值。

| 类型 | 可选值 | 默认 | 
| -------- | :----- | :----: |
| String | 见下描述 | -

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

## config.label
表单项标签，类型：`String`
<formkit
    :config="[
        {
            type: 'input',
            label: '这里展示label',
            key: 'labelTestKey'
        }
    ]"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'input',
            label: '这里展示label',
            key: 'labelTestKey'
        }
    ]"
    v-model="dataset">
</formkit>
```

## config.key
表单项绑定的key值，类型：`String`
<formkit
    :config="[
        {
            type: 'input',
            key: 'testKey'
        }
    ]"
    v-model="dataset">
</formkit>
<p>表单项当前绑定的key为testKey的值: {{ dataset.testKey }}</p>

```vue
<formkit
    :config="[
        {
            type: 'input',
            key: 'testKey'
        }
    ]"
    v-model="dataset">
</formkit>
<p>表单项当前绑定的key为testKey的值: {{ dataset.testKey }}</p>
```

## config.props
props字段为自定义项，注意该字段接受一个`Object`类型的数据，若`config.props`不为空formkit将使用`v-bind`将`config.props`绑定至所有模块包括您使用`registerModule`方法注册的自定义模块。

| 类型 | 可选值 | 默认 | 
| -------- | :----- | :----: |
| Object | 见下描述 | {}

如果你需要修改原生element-plus表单组价属性可以将其直接写入`props`内，例如：

希望修改[element-plus input attributes](https://element-plus.org/zh-CN/component/input#attributes)中的`clear-icon`、`placeholder`、 `maxlength`,你可以这样：

<formkit
    :config="[
        {
            type: 'input',
            label: '姓名',
            key: 'name',
            props: { placeholder: '请输入姓名', clearable: true, maxlength: 10 }
        }
    ]"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'input',
            label: '姓名',
            key: 'name',
            props: { placeholder: '请输入姓名', clearable: true, maxlength: 10 }
        }
    ]"
    v-model="dataset">
</formkit>
```

### value-key

| 类型 | 默认 | 
| -------- | :----- |
| String | id

作为 value 唯一标识的键名，当`config.options`为数组类型时或`config.requester`返回数组类型时你可能需要指定

<formkit
    :config="[
        {
            type: 'select',
            label: '选择学生',
            key: 'studentid',
            props: { placeholder: '请选择学生', clearable: true, valueKey: 'studentid' },
            options: [
                { name: '学生一', studentid: 1 },
                { name: '学生二', studentid: 2 },
                { name: '学生三', studentid: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>

输出: {{ dataset.studentid }}

```vue
<formkit
    :config="[
        {
            type: 'select',
            label: '选择学生',
            key: 'studentid',
            props: { placeholder: '请选择学生', clearable: true, valueKey: 'studentid' },
            options: [
                { name: '学生一', studentid: 1 },
                { name: '学生二', studentid: 2 },
                { name: '学生三', studentid: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>

输出: {{ dataset.studentid }}
```

### label-key

| 类型 | 默认 | 
| -------- | :----- |
| String | name

指定选项的数据源中节点标签为节点对象的某个属性值，当`config.options`为数组类型时或`config.requester`返回数组类型时你可能需要指定

<formkit
    :config="[
        {
            type: 'select',
            label: '学生',
            key: 'studentname',
            props: { placeholder: '请选择学生姓名', clearable: true, labelKey: 'studentname' },
            options: [
                { studentname: '学生一', id: 1 },
                { studentname: '学生二', id: 2 },
                { studentname: '学生三', id: 3 }
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
            label: '学生',
            key: 'studentname',
            props: { placeholder: '请选择学生姓名', clearable: true, labelKey: 'studentname' },
            options: [
                { studentname: '学生一', id: 1 },
                { studentname: '学生二', id: 2 },
                { studentname: '学生三', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```

## config.requester
当前表单项拉取远程数据请求函数，仅在模块或注册的模块对象上存在options时可用，类型：`Function`

::: warning
当前函数必须返回一个`Promise`对象，否则会失效。
:::

## config.handler
处理函数，用于处理`requester`返回的数据，类型：`Function`

<formkit
    :config="[
        {
            type: 'select',
            label: '远程获取选择框选项数据',
            key: 'requesterSelect',
            props: {
                labelKey: 'name',
                valueKey: 'id',
                placeholder: '请选择一个选项'
            },
            requester: () => {
                // return useAxios().get('/default/xxx')
                return fetchOptions()
            },
            handler: (response: any) => response?.items || []
        }
    ]"
    v-model="dataset">
</formkit>

::: code-tabs
@tab template
``` vue
<formkit
    :config="[
        {
            type: 'select',
            label: '远程获取选择框选项数据',
            key: 'requesterSelect',
            props: {
                labelKey: 'name',
                valueKey: 'id',
                placeholder: '请选择一个选项'
            },
            requester: () => {
                // return useAxios().get('/default/xxx')
                return fetchOptions()
            },
            handler: (response: any) => response?.items || []
        }
    ]"
    v-model="dataset">
</formkit>
```

@tab script
``` vue
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

## config.initialValue
初始值，类型：`String`

::: warning
仅在`remoteSearchSelect`模块中可用，否则会失效。
:::

## config.visible
`visible`字段用于控制当前项是否可见，当然您也可以使用它完成复杂表单的联动效果。

| 类型 | 说明 | 示例 |
| -------- | :----- | :-----: |
| undefined | 当前项不可见 | -
| Boolean | `true`: 当前项可见; `false`: 当前项不可见 | `visible: true`
| Object | 您需按照固定格式设置该类型的visible，具体见下FormKit Visible Object说明表。 | `visible: { key: 'name', value: 1 }`
| Array | 多个`visible`Object类型的校验，只要有一个满足当前项即可见。 | `visible: [{ key: 'name', value: 1 }, { key: 'name', value: 2 }]`

### FormKit Visible Object

当`visible`为`Object`类型时，您需要指定`key`、`value`值。

**key**

| 类型 | 说明 | 
| -------- | :----- |
| String | Formkit组件v-model绑定值的key

**value**

| 类型 | 说明 | 
| -------- | :----- |
| Any | 当前Formkit组件v-model绑定值key的值

::: warning
当`visible`为`Object`类型时，当前Formkit组件v-model绑定`key`的值等于您指定的`value`值时当前项显示，否则不显示
:::

<formkit
    :config="visibleExampleConfig"
    v-model="dataset">
</formkit>

::: code-tabs
@tab html
``` vue
<formkit
    :config="visibleExampleConfig"
    v-model="dataset">
</formkit>
```

@tab script
``` vue
<script setup lang="ts">
import formkit from 'element-plus-formkit';
import { ref, computed } from 'vue';

const dataset = ref({})

const visibleExampleConfig = computed(() => [
    {
        type: 'switch',
        label: '布尔类型的visible项目开关',
        key: 'switchValue',
        props: {
            'inline-prompt': true,
            'active-text': 'true',
            'inactive-text': 'false'
        }
    },
    { type: 'input', label: '布尔类型为true时可见的项目', key: 'booleans', visible: dataset.value.switchValue, disabled: true },
    {
        type: 'radio',
        label: '可见操作项选择器',
        key: 'radioValue',
        options: [
            { name: '数组类型项目可见', id: 1 },
            { name: '数组类型项目和对象类型项目可见', id: 2 },
            { name: '都不可见', id: 3 }
        ]
    },
    { type: 'input', label: '对象类型项目', key: 'objects', visible: { key: 'radioValue', value: 2 }, disabled: true },
    {
        type: 'input',
        label: '数组类型项目',
        key: 'arrays',
        visible: [
            { key: 'radioValue', value: 1 },
            { key: 'radioValue', value: 2 }
        ],
        disabled: true 
    }
])
</script>
```
:::

## config.rules
表单项校验规则集合，具体规则校验参数请参阅[ElementPlus 表单校验](https://element-plus.org/zh-CN/component/form.html#%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C)

``` vue{7-9}
<formkit
    v-model="dataset"
    :config="[
        {
            type: 'input',
            label: '输入数字',
            rules: [
                { required: true, message: '输入数字不能为空' }
            ],
            key: 'input',
            props: {
                placeholder: '请输入数字'
            }
        }
    ]"
/>
```
配合组件实现完整的表单项校验，参考[Expose](/element-plus-formkit/expose.html#validate)

<script setup lang="ts">
import formkit from 'element-plus-formkit';
import { ref, computed } from 'vue';

const dataset = ref({})

const visibleExampleConfig = computed(() => [
    {
        type: 'switch',
        label: '布尔类型的visible项目开关',
        key: 'switchValue',
        props: {
            'inline-prompt': true,
            'active-text': 'true',
            'inactive-text': 'false'
        }
    },
    { type: 'input', label: '布尔类型为true时可见的项目', key: 'booleans', visible: dataset.value.switchValue, disabled: true },
    {
        type: 'radio',
        label: '可见操作项选择器',
        key: 'radioValue',
        options: [
            { name: '数组类型项目可见', id: 1 },
            { name: '数组类型项目和对象类型项目可见', id: 2 },
            { name: '都不可见', id: 3 }
        ]
    },
    { type: 'input', label: '对象类型项目', key: 'objects', visible: { key: 'radioValue', value: 2 }, disabled: true },
    {
        type: 'input',
        label: '数组类型项目',
        key: 'arrays',
        visible: [
            { key: 'radioValue', value: 1 },
            { key: 'radioValue', value: 2 }
        ],
        disabled: true 
    }
])

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