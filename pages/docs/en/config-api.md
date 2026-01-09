# Component Configuration Items

The following configuration options apply to each object in the `config` array.

## config.type
The `type` field controls which modules Formkit loads. Field type: `String`. Valid values for `type` are described below.

| Type | Valid Values | Default | 
| -------- | :----- | :----: |
| String | See below | -

### input
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

### select
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

### checkbox
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

::: tip
Of course, when your options need to be obtained dynamically, you can still use the `requester` in conjunction with the `handler` to accomplish this. For details, refer to [select requester](#select).
:::

### radio
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

### inputNumber
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

### address
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

### popover
Text pop-up layer module selector

<formkit
    :config="[
        {
            type: 'popover',
            label: 'Text pop-up layer',
            key: 'popover',
            props: {
                placeholder: 'Please click to select'
            },
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
            type: 'popover',
            label: 'Text pop-up layer',
            key: 'popover',
            props: {
                placeholder: 'Please click to select'
            },
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

::: tip
Of course, when your options need to be obtained dynamically, you can still use the `requester` in conjunction with the `handler` to accomplish this. For details, refer to [select requester](#select).
:::

### remoteSearchSelect
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


### rate
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

## config.label
Form item label, type: `String`
<formkit
    :config="[
        {
            type: 'input',
            label: 'Here is the label',
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
            label: 'Here is the label',
            key: 'labelTestKey'
        }
    ]"
    v-model="dataset">
</formkit>
```

## config.key
Form item binding key value, type: `String`
<formkit
    :config="[
        {
            type: 'input',
            key: 'testKey'
        }
    ]"
    v-model="dataset">
</formkit>
<p>Form item current binding key value for testKey: {{ dataset.testKey }}</p>

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
<p>Form item current binding key value for testKey: {{ dataset.testKey }}</p>
```

## config.props
The `props` field is a custom property. Note that this field accepts data of type `Object`. If `config.props` is not empty, Formkit will use `v-bind` to bind `config.props` to all modules, including custom modules you register using the `registerModule` method.

| Type | Optional Values | Default | 
| -------- | :----- | :----: |
| Object | See the description below | {}

If you need to modify the native element-plus form component attributes, you can directly write them in the `props` field. For example:

To modify the `clear-icon`, `placeholder`, and `maxlength` attributes of [element-plus input attributes](https://element-plus.org/zh-CN/component/input#attributes), you can do the following:  

<formkit
    :config="[
        {
            type: 'input',
            label: 'Name',
            key: 'name',
            props: { placeholder: 'Please enter name', clearable: true, maxlength: 10 }
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
            key: 'name',
            props: { placeholder: 'Please enter name', clearable: true, maxlength: 10 }
        }
    ]"
    v-model="dataset">
</formkit>
```

### value-key

| Type | Default | 
| -------- | :----- |
| String | id

As the unique identifier key name for value, you may need to specify it when `config.options` is an array type or when the `config.requester` returns an array type.

<formkit
    :config="[
        {
            type: 'select',
            label: 'Select Student',
            key: 'studentid',
            props: { placeholder: 'Please select student', clearable: true, valueKey: 'studentid' },
            options: [
                { name: 'Student One', studentid: 1 },
                { name: 'Student Two', studentid: 2 },
                { name: 'Student Three', studentid: 3 }
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
            label: 'Select Student',
            key: 'studentid',
            props: { placeholder: 'Please select student', clearable: true, valueKey: 'studentid' },
            options: [
                { name: 'Student One', studentid: 1 },
                { name: 'Student Two', studentid: 2 },
                { name: 'Student Three', studentid: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>

Output: {{ dataset.studentid }}
```

### label-key

| Type | Default | 
| -------- | :----- |
| String | name

Specify the label of the option node in the data source of the option as the property value of the node object, when `config.options` is an array type or when the `config.requester` returns an array type. You may need to specify it.

<formkit
    :config="[
        {
            type: 'select',
            label: 'Select Student Name',
            key: 'studentname',
            props: { placeholder: 'Please select student name', clearable: true, labelKey: 'studentname' },
            options: [
                { studentname: 'Student One', id: 1 },
                { studentname: 'Student Two', id: 2 },
                { studentname: 'Student Three', id: 3 }
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
            label: 'Select Student Name',
            key: 'studentname',
            props: { placeholder: 'Please select student name', clearable: true, labelKey: 'studentname' },
            options: [
                { studentname: 'Student One', id: 1 },
                { studentname: 'Student Two', id: 2 },
                { studentname: 'Student Three', id: 3 }
            ]
        }
    ]"
    v-model="dataset">
</formkit>
```

## config.requester
The current form item remote data request function, available only when the module or registered module object exists `options`, type: `Function`

::: warning
The current function must return a `Promise` object, otherwise it will fail.
:::

## config.handler
Handler function, used to process the data returned by `requester`, type: `Function`

<formkit
    :config="[
        {
            type: 'select',
            label: 'Remotely retrieve radio button option data',
            key: 'requesterSelect',
            props: {
                labelKey: 'name',
                valueKey: 'id',
                placeholder: 'Please select an option'
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
            label: 'Remotely retrieve radio button option data',
            key: 'requesterSelect',
            props: {
                labelKey: 'name',
                valueKey: 'id',
                placeholder: 'Please select an option'
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
                { name: 'Option One', id: 1 },
                { name: 'Option Two', id: 2 },
                { name: 'Option Three', id: 3 }
            ]
           })
        }, 2000)
    })
}
</script>
```
:::

## config.initialValue
Initial value, type: `String`

::: warning
Only available in the `remoteSearchSelect` module, otherwise it will fail.
:::

## config.visible
`visible` field is used to control whether the current item is visible, of course you can also use it to complete complex form linkage effects.

| Type | Description | Example |
| -------- | :----- | :-----: |
| undefined | The current item is not visible | -
| Boolean | `true`: The current item is visible; `false`: The current item is not visible | `visible: true`
| Object | You need to set the `visible` object type in a fixed format, see the FormKit Visible Object table below for details. | `visible: { key: 'name', value: 1 }`
| Array | Multiple `visible` Object type validations, as long as one of them is met, the current item is visible. | `visible: [{ key: 'name', value: 1 }, { key: 'name', value: 2 }]`

### FormKit Visible Object

When the `visible` is of type `Object`, you need to specify the `key` and `value` values.

**key**

| Type | Description | 
| -------- | :----- |
| String | The key of the Formkit component v-model binding value.

**value**

| Type | Description | 
| -------- | :----- |
| Any | The value of the Formkit component v-model binding value key.

::: warning
When the `visible` is of type `Object`, the current Formkit component v-model binding `key` value is equal to the specified `value` value, then the current item is visible, otherwise it is not visible.
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
        label: 'Boolean-type visible item switch',
        key: 'switchValue',
        props: {
            'inline-prompt': true,
            'active-text': 'true',
            'inactive-text': 'false'
        }
    },
    { type: 'input', label: 'Boolean-type item visible when true', key: 'booleans', visible: dataset.value.switchValue, disabled: true },
    {
        type: 'radio',
        label: 'Visible item selector',
        key: 'radioValue',
        options: [
            { name: 'Array-type item visible', id: 1 },
            { name: 'Array-type item and object-type item visible', id: 2 },
            { name: 'Both not visible', id: 3 }
        ]
    },
    { type: 'input', label: 'Object-type item visible when 2', key: 'objects', visible: { key: 'radioValue', value: 2 }, disabled: true },
    {
        type: 'input',
        label: 'Array-type item visible when 1',
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
Form element validation rule set. For specific validation parameters, please refer to [ElementPlus Form Validation](https://element-plus.org/zh-CN/component/form.html#%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C).

``` vue{7-9}
<formkit
    v-model="dataset"
    :config="[
        {
            type: 'input',
            label: 'Input number',
            rules: [
                { required: true, message: 'Input number cannot be empty' }
            ],
            key: 'input',
            props: {
                placeholder: 'Please input number'
            }
        }
    ]"
/>
```
Combined with the component to implement complete form item validation, refer to [Expose](/element-plus-formkit/expose.html#validate)

<script setup lang="ts">
import formkit from 'element-plus-formkit';
import { ref, computed } from 'vue';

const dataset = ref({})

const visibleExampleConfig = computed(() => [
    {
        type: 'switch',
        label: 'Boolean-type visible item switch',
        key: 'switchValue',
        props: {
            'inline-prompt': true,
            'active-text': 'true',
            'inactive-text': 'false'
        }
    },
    { type: 'input', label: 'Boolean-type item visible when true', key: 'booleans', visible: dataset.value.switchValue, disabled: true },
    {
        type: 'radio',
        label: 'Visible item selector',
        key: 'radioValue',
        options: [
            { name: 'Array-type item visible', id: 1 },
            { name: 'Array-type item and object-type item visible', id: 2 },
            { name: 'Both not visible', id: 3 }
        ]
    },
    { type: 'input', label: 'Object-type item visible when 2', key: 'objects', visible: { key: 'radioValue', value: 2 }, disabled: true },
    {
        type: 'input',
        label: 'Array-type item visible when 1',
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
                { name: 'Option One', id: 1 },
                { name: 'Option Two', id: 2 },
                { name: 'Option Three', id: 3 }
            ]
           })
        }, 2000)
    })
}
</script>