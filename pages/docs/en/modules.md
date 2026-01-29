# Modules

The form components that make up the FormKit system are listed below. If these modules are not what you expect, you can also customize the modules using [registerModule](/en/extension-methods.md#registermodule).

## cascader

Cascading Selectors

When a dataset has a clear hierarchical structure, cascading selectors can be used to view and select items level by level.

<formkit
    :config="[
        {
            type: 'cascader',
            label: 'Cascading Selectors',
            key: 'cascaderValue',
            options: options,
            props: { placeholder: 'Please select data', clearable: true }
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
            label: 'Cascading Selectors',
            key: 'cascaderValue',
            options: options,
            props: { placeholder: 'Please select data', clearable: true }
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
[Native Element Plus ElCascader API](https://element-plus.org/en-US/component/cascader#cascader-attributes) Please write it in the `props` field.
:::

## input
Input field
<formkit
    :config="[
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please enter your name.', clearable: true }
        }
    ]"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please enter your name.', clearable: true }
        }
    ]"
    v-model="dataset">
</formkit>
```
::: tip
[Native Element Plus Input API](https://element-plus.org/zh-CN/component/input.html#api) Please write in the props field.
:::

## switch

Indicates switching between two mutually exclusive states, commonly used to trigger “on/off” functions.

<formkit
    :config="[
        {
            type: 'switch',
            label: 'Switch',
            key: 'switchValue',
            props: {
                inlinePrompt: true,
                activeText: 'Display multiple pieces of content in full',
                inactiveText: 'Multiple contents'
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
            label: 'Switch',
            key: 'switchValue',
            props: {
                inlinePrompt: true,
                activeText: 'Display multiple pieces of content in full',
                inactiveText: 'Multiple contents'
            }
        }
    ]"
    v-model="dataset">
</formkit>
```

::: tip
[Native Element Plus ElSwitch API](https://element-plus.org/en-US/component/switch#attributes) Please write it in the `props` field.
:::

## select
Select field, when there are too many options, a dropdown menu is used to display and select the content.

**Props-Specific Attributes**

| Name | Type | Description | Default
| -------- | :----- | :----: | :----: |
| onChoose | Function | Callback function triggered when the selected item changes. Arguments include the selected item's value, selected item's label, and all options | null

<formkit
    :config="[
        {
            type: 'select',
            label: 'Selector',
            key: 'select1',
            props: { placeholder: 'Please select.', clearable: true },
            options: [
                { name: 'Option one', id: 1 },
                { name: 'Option two', id: 2 },
                { name: 'Option three', id: 3 }
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
            props: { placeholder: 'Please select.', clearable: true },
            options: [
                { name: 'Option one', id: 1 },
                { name: 'Option two', id: 2 },
                { name: 'Option three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```

Select also supports dynamic loading of options through the `requester` field.

<formkit
    :config="[
        {
            type: 'select',
            label: 'Selector',
            key: 'select1',
            props: { placeholder: 'Please select.', clearable: true },
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
            props: { placeholder: 'Please select.', clearable: true },
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
                { name: 'Option one', id: 1 },
                { name: 'Option two', id: 2 },
                { name: 'Option three', id: 3 }
            ]
           })
        }, 2000)
    })
}
</script>
```
:::

`handler` serves as an additional auxiliary field. It is invoked after the completion of the `requester` to process the `requester`'s return value into a form executable by the ELselect option. Naturally, if your `requester`'s return value already conforms to the ELselect option's expected type, its use is unnecessary.

## checkbox
In a group of options, multiple items can be selected.

This module can be used with the `requester` method to dynamically retrieve data items, enabling remote data retrieval to dynamically replace the `options` property values. Alternatively, a `handler` can be passed in as a data processing function.

<formkit
    :config="[
        {
            type: 'checkbox',
            label: 'Checkbox',
            key: 'checkbox',
            options: [
                { name: 'Option one', id: 1 },
                { name: 'Option two', id: 2 },
                { name: 'Option three', id: 3 }
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
                { name: 'Option one', id: 1 },
                { name: 'Option two', id: 2 },
                { name: 'Option three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```
`showAllCheck` property is used to represent the indeterminate state of the checkbox, generally used to implement the effect of full selection.

<formkit
    :config="[
        {
            type: 'checkbox',
            label: 'Select All checkbox',
            key: 'checkbox',
            props: { showAllCheck: true },
            options: [
                { name: 'Option one', id: 1 },
                { name: 'Option two', id: 2 },
                { name: 'Option three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>

output: {{ dataset.checkbox }}

::: code-tabs
@tab Template
```vue
<formkit
    :config="[
        {
            type: 'checkbox',
            label: 'Select All checkbox',
            key: 'checkbox',
            props: { showAllCheck: true },
            options: [
                { name: 'Option one', id: 1 },
                { name: 'Option two', id: 2 },
                { name: 'Option three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```

@tab Script
```ts
import formkit, { setConfigure } from 'element-plus-formkit';
import en from 'element-plus/es/locale/lang/en';
import { ref, computed } from 'vue';

const dataset = ref({})

setConfigure('lang', en);
```
:::

The `checkbox` module with the `requester` method for dynamically fetching data items

<formkit
    :config="[
        {
            type: 'checkbox',
            label: 'Select All checkbox',
            key: 'checkbox',
            props: { showAllCheck: true },
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
            type: 'checkbox',
            label: 'Select All checkbox',
            key: 'checkbox',
            props: { showAllCheck: true },
            requester: fetchOptions,
            handler: (response: any) => response?.items || []
        }
    ]"
    v-model="dataset">
</formkit>
```

@tab Script
```ts
import formkit, { setConfigure } from 'element-plus-formkit';
import en from 'element-plus/es/locale/lang/en';
import { ref, computed } from 'vue';

const dataset = ref({})

setConfigure('lang', en);

function fetchOptions() {
    return new Promise((r, j) => {
        setTimeout(() => {
           r({
            code: 200,
            items: [
                { name: 'Option one', id: 1 },
                { name: 'Option two', id: 2 },
                { name: 'Option three', id: 3 }
            ]
           })
        }, 2000)
    })
}
```
:::

## radio
In a group of options, only one item can be selected.

This module can be used with the `requester` method to dynamically retrieve data items, enabling remote data retrieval to dynamically replace the `options` property values. Alternatively, a `handler` can be passed in as a data processing function.

The main body of the `radio` module utilizes `ELRadio`. Through `props`, we can pass required parameters to the attributes of [ELRadio Attributes](https://element-plus.org/zh-CN/component/radio#radio-attributes).

**Props-Specific Attributes**

| Name | Type | Description | Default
| ------- | :----- | :----: | :----: |
| type | String | Radio button type. Options: button (button radio), default (standard radio) | default
| valueKey | String | Unique identifier key for the value. Required when binding object-type values | id
| labelKey | String | Specifies the option label as a property value from the option object | name

<formkit
    :config="[
        {
            type: 'radio',
            label: 'Single-selection box',
            key: 'radio',
            options: [
                { name: 'Option one', id: 1 },
                { name: 'Option two', id: 2 },
                { name: 'Option three', id: 3 }
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
            label: 'Single-selection box',
            key: 'radio',
            options: [
                { name: 'Option one', id: 1 },
                { name: 'Option two', id: 2 },
                { name: 'Option three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>

output: {{ dataset.radio }}
```

::: tip
Of course, when your options need to be obtained dynamically, you can still use the `requester` in conjunction with the `handler` to accomplish this. For details, refer to [select requester](#select).
:::

## inputNumber
Number input box, only standard numeric values are allowed. You can define the range. For detailed API parameters, please refer to [ElInputNumber API](https://element-plus.org/zh-CN/component/input-number.html).

<formkit
    :config="[
        {
            type: 'inputNumber',
            label: 'Stepping input box',
            key: 'inputNumber',
            props: {
                min: 0,
                max: 10,
                style: { width: '100%' },
                prefix: 'Prefix',
                suffix: 'Suffix'
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
            label: 'Stepping input box',
            key: 'inputNumber',
            props: {
                min: 0,
                max: 10,
                style: { width: '100%' },
                prefix: 'Prefix',
                suffix: 'Suffix'
            }
        }
    ]"
    v-model="dataset">
</formkit>

output: {{ dataset.inputNumber }}
```
::: warning
When you need to use the [ElInputNumber native API](https://element-plus.org/zh-CN/component/input-number.html), you need to wrap it with `props`.
:::

## address
Hierarchical Area Address Selector
To use this module, pass in a `requester` as the data source. Alternatively, you can pass in a `handler` as the data processing function.

The core of the `address` module utilizes `ELCascader`. Using `props`, we can pass required parameters to the attributes of [ELCascader](https://element-plus.org/zh-CN/component/cascader#cascader-attributes).

**Props-Specific Attributes**

| Name | Type | Description | Default
| -------- | :----- | :----: | :----: |
| level | Number | Hierarchical levels selectable by the address picker. Note: level starts at 0. Example: 0=>Province selection, 1=>Province and city selection | 1
| cascaderProps | Object | When address uses ELCascader, cascaderProps contains parameters to pass to [ELCascader cascaderprops](https://element-plus.org/zh-CN/component/cascader#cascaderprops) | {}
| valueKey | String | Key name uniquely identifying the value. Required when binding an object type. | id
| labelKey | String | Specifies the option label as a property value of the option object. | name

<formkit
    :config="[
        {
            type: 'address',
            label: 'Address selector',
            key: 'address',
            requester: (pid: number) => {
                return fetchOptions()
            },
            handler: (response: any) => response?.items || [],
            props: {
                style: { width: '50%' },
                level: 2,
                placeholder: 'Please select an address'
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
            label: 'Address selector',
            key: 'address',
            requester: (pid: number) => {
                return fetchOptions()
            },
            handler: (response: any) => response?.items || [],
            props: {
                style: { width: '50%' },
                level: 2,
                placeholder: 'Please select an address'
            }
        }
    ]"
    v-model="dataset">
</formkit>
output: {{ dataset.address }}
```

## popover
Text pop-up layer module selector.

This module can be used with the `requester` method to dynamically retrieve data items, enabling remote data retrieval to dynamically replace the `options` property values. Alternatively, a `handler` can be passed in as a data processing function.

The `popover` module core utilizes `ELPopover`. Through the `props` parameter, we can pass required parameters to the attributes of [ELPopover Attributes](https://element-plus.org/zh-CN/component/popover#attributes).

**Props-Specific Attributes**

| Name | Type | Description | Default
| -------- | :----- | :----: | :----: |
| props | Object | Parameters required for passing to [ELCascader cascaderpanel-api](https://element-plus.org/zh-CN/component/cascader#cascaderpanel-api) | id
| valueKey | String | Unique identifier key for value; required when binding object-type values | id
| labelKey | String | Specifies the option label as a property value of the option object | name
| loading | Boolean | Indicates whether data is being fetched remotely | false
| requester | Function | Method for dynamically fetching data items. Replaces the `options` property value during remote data retrieval. Supports all modules with an `options` property | null
| handler | Function | `handler` serves as an auxiliary field. After `requester` completes, the module calls `handler` with its return value as an argument. The `handler` return value becomes the module's data source | null

<formkit
    :config="[
        {
            type: 'popover',
            label: 'Text pop-up layer',
            key: 'popover',
            props: {
                placeholder: 'Please click to select',
                props: { multiple: true }
            },
            options: [
                { name: 'Option one', id: 1, children: [{ name: 'Option one-1', id: 11 }] },
                { name: 'Option two', id: 2 },
                { name: 'Option three', id: 3 }
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
            label: 'Text pop-up layer',
            key: 'popover',
            props: {
                placeholder: 'Please click to select',
                props: { multiple: true }
            },
            options: [
                { name: 'Option one', id: 1, children: [{ name: 'Option one-1', id: 11 }] },
                { name: 'Option two', id: 2 },
                { name: 'Option three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```

::: tip
Of course, when your options need to be obtained dynamically, you can still use the `requester` in conjunction with the `handler` to accomplish this. For details, refer to [select requester](#select).
:::

## remoteSearchSelect
A select dropdown with remote query functionality. To use this module, pass in a `requester` as the remote query data source. Alternatively, you can pass in a `handler` as the data processing function.

The `remoteSearchSelect` module body utilizes `ELSelect`. Through `props`, we can pass required parameters to the attributes of [ELSelect Attributes](https://element-plus.org/zh-CN/component/select#select-attributes).

**Props-Specific Attributes**

| Name | Type | Description | Default
| -------- | :----- | :----: | :----: |
| valueKey | String | Key uniquely identifying the value; required when binding object-type values | id
| labelKey | String | Specifies the option label as a property value of the option object | name
| initialValue | any | Initial value; typically used for data echo. When the module runs, it first checks if this value exists. If present, it passes this value as an argument to `props.requester` | -
| onChoose | Function | Callback executed when an option is selected | null

<formkit
    :config="[
        {
            type: 'remoteSearchSelect',
            label: 'Remote query selector',
            key: 'remoteSearchSelect',
            requester: (searchName: string) => fetchOptions(),
            handler: (response: any) => response?.items || [],
            props: {
                labelKey: 'name',
                valueKey: 'id',
                initialValue: null,
                placeholder: 'Please enter query content',
                onChoose: (item: any) => dataset.onChooseCallback = item
            }
        }
    ]"
    v-model="dataset">
</formkit>

Output remoteSearchSelect: {{ dataset.remoteSearchSelect }}

Output onChooseCallback: {{ dataset.onChooseCallback }}

```vue
<formkit
    :config="[
        {
            type: 'remoteSearchSelect',
            label: 'Remote query selector',
            key: 'remoteSearchSelect',
            props: {
                labelKey: 'name',
                valueKey: 'id',
                initialValue: null,
                placeholder: 'Please enter query content',
                requester: (searchName: string) => fetchOptions(),
                handler: (response: any) => response?.items || [],
                onChoose: (item: any) => dataset.onChooseCallback = item
            }
        }
    ]"
    v-model="dataset">
</formkit>
```

Typically, selectors for remotely loading data are difficult to control for default data handling. This is because backend data queries often require `item.name`, while data binding typically uses `item.id`. To address this, we introduce a new parameter (`initialValue`) for control. When the `initialValue` parameter is non-empty, we immediately pass it as an argument to the `requester` you provide after the component finishes loading.

## rate
Rating selector

<formkit
    :config="[
        {
            type: 'rate',
            label: 'Rating',
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
            label: 'Rating',
            key: 'rate',
            props: { 'allow-half': false, colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'], size: 'large' }
        }
    ]"
    v-model="dataset">
</formkit>
```
::: tip
[Native Element Plus Rate API](https://element-plus.org/zh-CN/component/rate.html#api) Please write it in the `props` field.
:::

## datePicker

Used for selecting or entering dates

<formkit
    :config="[
        {
            type: 'datePicker',
            label: 'Date Picker',
            key: 'datePickerValue',
            props: { valueFormat: 'YYYY-MM-DD', placeholder: 'Click to select a date' }
        }
    ]"
    v-model="dataset">
</formkit>

<p>Output: {{ dataset.datePickerValue || "-" }}</p>

```vue
<formkit
    :config="[
        {
            type: 'datePicker',
            label: 'Date Picker',
            key: 'datePickerValue',
            props: { valueFormat: 'YYYY-MM-DD', placeholder: 'Click to select a date' }
        }
    ]"
    v-model="dataset">
</formkit>

<p>Output: {{ dataset.datePickerValue || "-" }}</p>
```

::: tip
[Native ElDatePicker API](https://element-plus.org/en-US/component/cascader#cascaderpanel-api)Please write inside the props.
:::

## timePicker

Time Selector

Used for selecting or entering dates

<formkit
    :config="[
        {
            type: 'timePicker',
            label: 'Time Selector',
            key: 'timePickerValue',
            props: { placeholder: 'Click to select time' }
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
            label: 'Time Selector',
            key: 'timePickerValue',
            props: { placeholder: 'Click to select time' }
        }
    ]"
    v-model="dataset">
</formkit>

<p>Output: {{ dataset.timePickerValue || "-" }}</p>
```

::: tip
[Native ElDatePicker API](https://element-plus.org/en-US/component/time-picker#attributes)Please write inside the props.
:::

## timeSelect

For selecting or entering dates

The available time range is 00:00-23:59

<formkit
    :config="[
        {
            type: 'timeSelect',
            label: 'Time Selection',
            key: 'timeSelectValue',
            props: { placeholder: 'Click To Time Selection', start: '08:30', end: '18:30' }
        }
    ]"
    v-model="dataset">
</formkit>

<p>Output: {{ dataset.timeSelectValue || "-" }}</p>

```vue
<formkit
    :config="[
        {
            type: 'timeSelect',
            label: 'Time Selection',
            key: 'timeSelectValue',
            props: { placeholder: 'Click To Time Selection', start: '08:30', end: '18:30' }
        }
    ]"
    v-model="dataset">
</formkit>

<p>Output: {{ dataset.timeSelectValue || "-" }}</p>
```

::: tip
[Native ElTimeSelect API](https://element-plus.org/en-US/component/time-select#attributes)Please write inside the props.
:::

## upload

Uploader

Click to upload files.

**Props-Specific Properties**

| Name | Type | Description | Default
| -------- | :----- | :----: | :----: |
| limit | Number | Upload file quantity limit | 1
| autoUpload | Boolean | Enable auto-upload | true
| isCustom | Boolean | Enable custom upload | false
| beforeUpload | Function | Pre-upload callback for file preprocessing | null
| afterUpload | Function | Post-upload callback function for subsequent processing of uploaded files | null
| accept | String | Accepted file types, e.g., ‘.jpg,.png’. To accept a unified file type category (e.g., images), use ‘image/*’ | -
| size | Number | Upload button size | 80

<formkit
    :config="[
        {
            type: 'upload',
            label: 'Uploader',
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

**The use of the uploader requires configuration.[setConfigure upload](/extension-methods.md#setconfigure)**

::: code-tabs
@tab template
```vue
<formkit
    :config="[
        {
            type: 'upload',
            label: 'Uploader',
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

## slider
Slider selector

Select within a fixed range by dragging the slider.

Output: {{ dataset.sliderValue || "-" }}

<formkit
    :config="[
        {
            type: 'slider',
            label: 'Slider selector',
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
            label: 'Slider selector',
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
[Native ElSlider API](https://element-plus.org/en-US/component/slider#attributes)Please write inside the props.
:::

## treeSelect

A tree selector with dropdown menus, combining the functionality of the el-tree and el-select components.

<formkit
    :config="[
        {
            type: 'treeSelect',
            label: 'Time Selection',
            key: 'timeSelectValue',
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
            label: 'Time Selection',
            key: 'timeSelectValue',
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
[Native ElTreeSelect API](https://element-plus.org/en-US/component/tree#attributes)Please write inside the props.
:::

<script setup lang="ts">
import formkit, { setConfigure } from 'element-plus-formkit';
import en from 'element-plus/es/locale/lang/en';
import { ref, computed } from 'vue';

const dataset = ref({})

setConfigure('lang', en);

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