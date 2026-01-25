# 组件配置项(Component Configuration Items)

以下配置项针对于config数组中的每个对象

## config.type
type字段用于控制formkit加载相关的模块，字段类型：`String`,下面将介绍type相关合法值。

| 类型 | 可选值 | 默认 | 
| -------- | :----- | :----: |
| String | 见 [模块](/modules.md) | -

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
当前表单项拉取远程数据请求函数，远程获取数据动态替换`options`属性值，支持所有存在`options`属性的模块，类型：`Function`

::: warning
当前函数必须返回一个`Promise`对象，否则会失效。
:::

## config.handler
处理函数，用于处理`requester`返回的数据，`handler`作为额外的辅助字段，模块会在`requester`完成后将返回值作为参数调用`handler`，最终将`handler`返回值作为模块数据源，类型：`Function`

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