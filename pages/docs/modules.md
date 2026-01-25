# 模块

组成formkit系统的各个表单组件，以下模块若不是您的预期，您也可以自定义模块[registerModule](/extension-methods.md#registermodule)

## cascader 级联选择器

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

<formkit
    :config="[
        {
            type: 'cascader',
            label: '级联选择器',
            key: 'cascaderValue',
            options: options,
            props: { placeholder: '请选择数据', clearable: true }
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
            type: 'cascader',
            label: '级联选择器',
            key: 'cascaderValue',
            options: options,
            props: { placeholder: '请选择数据', clearable: true }
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

const options = ref([
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          { value: 'consistency', label: 'Consistency' },
          { value: 'feedback', label: 'Feedback' },
          { value: 'efficiency', label: 'Efficiency' },
          { value: 'controllability', label: 'Controllability' }
        ]
      }
    ]
  }
])
</script>
```
:::

::: tip
[原生ElCascader API](https://element-plus.org/zh-CN/component/cascader#cascader-attributes)请写入props内
:::

## input 输入框
输入框
<formkit
    :config="[
        {
            type: 'input',
            label: '姓名',
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
            label: '姓名',
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

## switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

<formkit
    :config="[
        {
            type: 'switch',
            label: '开关',
            key: 'switchValue',
            props: {
                inlinePrompt: true,
                activeText: '完整展示多个内容',
                inactiveText: '多个内容'
            }
        }
    ]"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'switch',
            label: '开关',
            key: 'switchValue',
            props: {
                inlinePrompt: true,
                activeText: '完整展示多个内容',
                inactiveText: '多个内容'
            }
        }
    ]"
    v-model="dataset">
</formkit>
```

::: tip
[原生ElSwitch API](https://element-plus.org/zh-CN/component/switch#attributes)请写入props内
:::

## select 选择器
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

## checkbox 多选框
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

## radio 单选框
在一组备选项中进行单选

`radio`模块主体使用了`ELRadio`，借助`props`我们可以将需要的参数传递给[ELRadio Attributes](https://element-plus.org/zh-CN/component/radio#radio-attributes)的参数 

**Props特有属性**

| 名称 | 类型 | 说明 | 默认
| -------- | :----- | :----: | :----: |
| type | String | 单选框形态，可选值：button（按钮radio）、default（常规radio） | default
| valueKey | String | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | id
| labelKey | String | 指定选项标签为选项对象的某个属性值 | name

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

## inputNumber  数字输入框

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

## address 地址选择器
具有层级的区域地址选择器, 使用此模块需要传入`requester`作为数据源

`address`模块主体使用了`ELCascader`，借助`props`我们可以将需要的参数传递给[ELCascader Attributes](https://element-plus.org/zh-CN/component/cascader#cascader-attributes)的参数 

**Props特有属性**

| 名称 | 类型 | 说明 | 默认
| -------- | :----- | :----: | :----: |
| level | Number | 地址选择器可选择的层级,注意level是从0开始，例如: 0=>省份选择、1=>省份、城市选择 | 1
| requester | Promise | 地址选择器获取数据源方法，注意此方法存在一个形参值为当前选择项的value值 | () => {}
| cascaderProps | Object | address使用了ELCascader，cascaderProps参数为需要传递给[ELCascader cascaderprops](https://element-plus.org/zh-CN/component/cascader#cascaderprops)的参数 | {}
| handler | Function | `handler`作为额外的辅助字段，用于处理`requester`完成后返回的数据 | () => {}
| valueKey | String | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | id
| labelKey | String | 指定选项标签为选项对象的某个属性值 | name

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

## popover 文字弹出层
文字弹出层模块选择器

`popover`模块主体使用了`ELPopover`，借助`props`参数我们可以将需要的参数传递给[ELPopover Attributes](https://element-plus.org/zh-CN/component/popover#attributes)的参数

**Props特有属性**

| 名称 | 类型 | 说明 | 默认
| -------- | :----- | :----: | :----: |
| props | Object | 需要的参数传递给[ELCascader cascaderpanel-api](https://element-plus.org/zh-CN/component/cascader#cascaderpanel-api)的参数 | id
| valueKey | String | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | id
| labelKey | String | 指定选项标签为选项对象的某个属性值 | name
| loading | Boolean | 是否正在从远程获取数据 | false
| requester | Function | 动态获取数据项方法，远程获取数据动态替换`options`属性值，支持所有存在`options`属性的模块 | null
| handler | Function | `handler`作为额外的辅助字段，模块会在`requester`完成后将返回值作为参数调用`handler`，最终将`handler`返回值作为模块数据源 | null

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

## remoteSearchSelect 远程查询
具备远程查询功能的select下拉选择器

`remoteSearchSelect`模块主体使用了`ELSelect`，借助`props`我们可以将需要的参数传递给[ELSelect Attributes](https://element-plus.org/zh-CN/component/select#select-attributes)的参数 

**Props特有属性**

| 名称 | 类型 | 说明 | 默认
| -------- | :----- | :----: | :----: |
| valueKey | String | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | id
| labelKey | String | 指定选项标签为选项对象的某个属性值 | name
| initialValue | any | 初始值；通常用作数据回显，当模块运行时会首先检测此值是否存在，若存在则将此值作为参数运行`props.requester` | -
| onChoose | Function | 选中项时的回调 | null
| requester | Function | 动态获取数据项方法 | null
| handler | Function | `handler`作为额外的辅助字段，模块会在`requester`完成后将返回值作为参数调用`handler`，最终将`handler`返回值作为模块数据源 | null

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

::: code-tabs
@tab Template
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

@tab Script
```vue
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

通常对于数据进行远程加载的选择器对于默认数据处理通常难以控制，因为通常后端处理数据查询需要接受`item.name`但数据绑定通常为`item.id`，为此我们引入一个新的参数(`initialValue`)来进行控制, 当`initialValue`参数不为空时，我们会在组件完成加载后立即将`initialValue`作为形参调取您提供的`requester`


## rate 评分
评分选择器，用于评分

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
[原生ELRate API](https://element-plus.org/zh-CN/component/rate.html#api)请写入props内
:::

## datePicker 日期选择器

用于选择或输入日期

<formkit
    :config="[
        {
            type: 'datePicker',
            label: '日期选择器',
            key: 'datePickerValue',
            props: { valueFormat: 'YYYY-MM-DD', placeholder: '点击选择日期' }
        }
    ]"
    v-model="dataset">
</formkit>

<p>输出：{{ dataset.datePickerValue || "-" }}</p>

```vue
<formkit
    :config="[
        {
            type: 'datePicker',
            label: '日期选择器',
            key: 'datePickerValue',
            props: { valueFormat: 'YYYY-MM-DD', placeholder: '点击选择日期' }
        }
    ]"
    v-model="dataset">
</formkit>

<p>输出：{{ dataset.datePickerValue || "-" }}</p>
```

::: tip
[原生ElDatePicker API](https://element-plus.org/zh-CN/component/date-picker#%E5%B1%9E%E6%80%A7)请写入props内
:::

## timePicker 时间选择器

用于选择或输入日期

<formkit
    :config="[
        {
            type: 'timePicker',
            label: '时间选择器',
            key: 'timePickerValue',
            props: { placeholder: '点击选择时间' }
        }
    ]"
    v-model="dataset">
</formkit>

<p>输出：{{ dataset.timePickerValue || "-" }}</p>

```vue
<formkit
    :config="[
        {
            type: 'timePicker',
            label: '时间选择器',
            key: 'timePickerValue',
            props: { placeholder: '点击选择时间' }
        }
    ]"
    v-model="dataset">
</formkit>

<p>输出：{{ dataset.timePickerValue || "-" }}</p>
```

::: tip
[原生ElTimePicker API](https://element-plus.org/zh-CN/component/time-picker#attributes)请写入props内
:::

## timeSelect 时间选择

用于选择或输入日期

可用时间范围是 00:00-23:59

<formkit
    :config="[
        {
            type: 'timeSelect',
            label: '时间选择',
            key: 'timeSelectValue',
            props: { placeholder: '点击时间选择', start: '08:30', end: '18:30' }
        }
    ]"
    v-model="dataset">
</formkit>

<p>输出：{{ dataset.timeSelectValue || "-" }}</p>

```vue
<formkit
    :config="[
        {
            type: 'timeSelect',
            label: '时间选择',
            key: 'timeSelectValue',
            props: { placeholder: '点击时间选择', start: '08:30', end: '18:30' }
        }
    ]"
    v-model="dataset">
</formkit>

<p>输出：{{ dataset.timeSelectValue || "-" }}</p>
```

::: tip
[原生ElTimeSelect API](https://element-plus.org/zh-CN/component/time-select#attributes)请写入props内
:::

## upload 上传器

通过点击上传文件。

<formkit
    :config="[
        {
            type: 'upload',
            label: '上传器',
            key: 'uploadValue',
            props: {
                limit: 4,
                afterUpload: (response) => {
                    return response.data
                }
            }
        }
    ]"
    v-model="dataset">
</formkit>

**上传器的使用，需要配置[setConfigure upload](/extension-methods.md#setconfigure)**

::: code-tabs
@tab template
```vue
<formkit
    :config="[
        {
            type: 'upload',
            label: '上传器',
            key: 'uploadValue',
            props: {
                limit: 4,
                afterUpload: (response) => {
                    return response.data
                }
            }
        }
    ]"
    v-model="dataset">
</formkit>
```
@tab typescript
```vue
<script setup lang="ts">
import formkit, { setConfigure } from 'element-plus-formkit';
import type { UploadRequesterOptions } from 'element-plus-formkit/types/formkit-types'
import { ref, computed } from 'vue';

const dataset = ref({})

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

## slider 滑块
滑块选择器

通过拖动滑块在一个固定区间内进行选择

Output: {{ dataset.sliderValue || "-" }}

<formkit
    :config="[
        {
            type: 'slider',
            label: '滑块选择器',
            key: 'sliderValue',
            props: {
                range: true,
                marks: {
                    0: '0°C',
                    8: '8°C',
                    37: '37°C',
                    50: {
                        style: {
                        color: '#1989FA',
                        },
                        label: '50%',
                    }
                }
            }
        }
    ]"
    v-model="dataset">
</formkit>

<br />

```vue
<formkit
    :config="[
        {
            type: 'slider',
            label: '滑块选择器',
            key: 'sliderValue',
            props: {
                range: true,
                marks: {
                    0: '0°C',
                    8: '8°C',
                    37: '37°C',
                    50: {
                        style: {
                        color: '#1989FA',
                        },
                        label: '50%',
                    }
                }
            }
        }
    ]"
    v-model="dataset">
</formkit>
```

::: tip
[原生ElSlider API](https://element-plus.org/zh-CN/component/slider#属性)请写入props内
:::

## treeSelect 树形选择

含有下拉菜单的树形选择器，结合了 el-tree 和 el-select 两个组件的功能。

<formkit
    :config="[
        {
            type: 'treeSelect',
            label: '树形选择器',
            key: 'treeSelectValue',
            props: {
                'render-after-expand': false,
                style: { width: '240px' },
                data: [
                    {
                        value: '1',
                        label: 'Level one 1',
                        children: [
                            {
                                value: '1-1',
                                label: 'Level two 1-1',
                                children: [
                                    {
                                        value: '1-1-1',
                                        label: 'Level three 1-1-1'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: '2',
                        label: 'Level one 2',
                        children: [
                            {
                                value: '2-1',
                                label: 'Level two 2-1',
                                children: [
                                    {
                                        value: '2-1-1',
                                        label: 'Level three 2-1-1'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: '3',
                        label: 'Level one 3',
                        children: [
                            {
                                value: '3-1',
                                label: 'Level two 3-1',
                                children: [
                                    {
                                        value: '3-1-1',
                                        label: 'Level three 3-1-1'
                                    }
                                ]
                            },
                            {
                                value: '3-2',
                                label: 'Level two 3-2',
                                children: [
                                    {
                                        value: '3-2-1',
                                        label: 'Level three 3-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    ]"
    v-model="dataset">
</formkit>

<p>Output: {{ dataset.timeSelectValue || "-" }}</p>

```vue
<formkit
    :config="[
        {
            type: 'treeSelect',
            label: '树形选择器',
            key: 'treeSelectValue',
            props: {
                'render-after-expand': false,
                style: { width: '240px' },
                data: [
                    {
                        value: '1',
                        label: 'Level one 1',
                        children: [
                            {
                                value: '1-1',
                                label: 'Level two 1-1',
                                children: [
                                    {
                                        value: '1-1-1',
                                        label: 'Level three 1-1-1'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: '2',
                        label: 'Level one 2',
                        children: [
                            {
                                value: '2-1',
                                label: 'Level two 2-1',
                                children: [
                                    {
                                        value: '2-1-1',
                                        label: 'Level three 2-1-1'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: '3',
                        label: 'Level one 3',
                        children: [
                            {
                                value: '3-1',
                                label: 'Level two 3-1',
                                children: [
                                    {
                                        value: '3-1-1',
                                        label: 'Level three 3-1-1'
                                    }
                                ]
                            },
                            {
                                value: '3-2',
                                label: 'Level two 3-2',
                                children: [
                                    {
                                        value: '3-2-1',
                                        label: 'Level three 3-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    ]"
    v-model="dataset">
</formkit>

<p>Output: {{ dataset.timeSelectValue || "-" }}</p>
```

::: tip
[原生ElTreeSelect API](https://element-plus.org/zh-CN/component/tree#属性)请写入props内
:::

<script setup lang="ts">
import formkit, { setConfigure } from 'element-plus-formkit';
import type { UploadRequesterOptions } from 'element-plus-formkit/types/formkit-types'
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

const options = ref([
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          { value: 'consistency', label: 'Consistency' },
          { value: 'feedback', label: 'Feedback' },
          { value: 'efficiency', label: 'Efficiency' },
          { value: 'controllability', label: 'Controllability' }
        ]
      }
    ]
  }
])
</script>