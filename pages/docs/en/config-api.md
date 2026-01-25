# Component Configuration Items

The following configuration options apply to each object in the `config` array.

## config.type
The `type` field controls which modules Formkit loads. Field type: `String`. Valid values for `type` are described below.

| Type | Valid Values | Default | 
| -------- | :----- | :----: |
| String | [See Formkit Modules](/en/modules.md) | -

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
Current form item's remote data fetching function dynamically replaces the `options` property value upon remote data retrieval. Supports all modules containing the `options` property. Type: `Function`

::: warning
The current function must return a `Promise` object, otherwise it will fail.
:::

## config.handler
Handler function used to process data returned by the `requester`. The `handler` serves as an additional auxiliary field. After the `requester` completes, the module will invoke the `handler` with the return value as an argument. The `handler`'s return value ultimately becomes the module's data source. Type: `Function`

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
import formkit, { setConfigure } from 'element-plus-formkit';
import en from 'element-plus/es/locale/lang/en';
import { ref, computed } from 'vue';

const dataset = ref({})

setConfigure('lang', en);

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