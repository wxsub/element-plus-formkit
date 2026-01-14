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

::: tip
Of course, when your options need to be obtained dynamically, you can still use the `requester` in conjunction with the `handler` to accomplish this. For details, refer to [select requester](#select).
:::

## radio
In a group of options, only one item can be selected.

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
Has a hierarchical region address selector. Using this module requires passing in a `requester` as the data source.

<formkit
    :config="[
        {
            type: 'address',
            label: 'Address selector',
            key: 'address',
            props: {
                style: { width: '50%' },
                level: 2,
                placeholder: 'Please select an address',
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
            label: 'Address selector',
            key: 'address',
            props: {
                style: { width: '50%' },
                level: 2,
                placeholder: 'Please select an address',
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
Unlike select, checkbox, radio, etc. modules that need to dynamically get `options`, the `requester` of the `address` module needs to be wrapped with `props`.
:::

## popover
Text pop-up layer module selector

[popover props parameter](https://element-plus.org/en-US/component/cascader#cascaderprops)

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
Remote query selector with dropdown functionality.

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