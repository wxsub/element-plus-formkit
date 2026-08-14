# Formkit Component Props

## model-value / v-model
Component binds to data source, type: `Object`

## config
Component configuration item, please refer to [Config Api](/en/config-api.md) for specific parameters. Type: `Array`

## disabled
Disable the entire form. Type: `Boolean`

<formkit
    :config="[
        {
            type: 'input',
            label: 'name',
            key: 'password',
            props: { placeholder: 'Please input name', clearable: true }
        }
    ]"
    :disabled="true"
    v-model="dataset">
</formkit>

``` vue{10}
<formkit
    :config="[
        {
            type: 'input',
            label: 'name',
            key: 'password',
            props: { placeholder: 'Please input name', clearable: true }
        }
    ]"
    :disabled="true"
    v-model="dataset">
</formkit>
```

## labelPosition
Position of the form item label, when set to left or right, you also need to set the label-width attribute.

> Options: 'left' | 'right' | 'top'

<formkit
    :config="[
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please input name', clearable: true }
        }
    ]"
    labelPosition="left"
    v-model="dataset">
</formkit>
<br />
<formkit
    :config="[
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please input name', clearable: true }
        }
    ]"
    labelPosition="right"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please input name', clearable: true }
        }
    ]"
    labelPosition="left"
    v-model="dataset">
</formkit>
<br />
<formkit
    :config="[
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please input name', clearable: true }
        }
    ]"
    labelPosition="right"
    v-model="dataset">
</formkit>
```

## labelWidth
Label length, type: `Number | String`

For example, 50. Form-item elements that are direct children of the Form element inherit this value.

It also supports `'auto'`, in which case FormKit precisely measures each label's text width through a hidden probe element using the form item label's actual rendered styles (including required-asterisk compensation and typography effects such as letter-spacing and kerning, so labels won't wrap due to OS or font differences). Only takes effect when `labelPosition` is `left` or `right`.

<formkit
    :config="[
        { type: 'input', label: 'Name', key: 'name' },
        { type: 'input', label: 'Central Local Unit Identifier', key: 'unitId' },
        { type: 'input', label: 'Test labelWidth', key: 'testLabelWidth' }
    ]"
    labelPosition="right"
    labelWidth="auto"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        { type: 'input', label: 'Name', key: 'name' },
        { type: 'input', label: 'Central Local Unit Identifier', key: 'unitId' },
        { type: 'input', label: 'Test labelWidth', key: 'testLabelWidth' }
    ]"
    labelPosition="right"
    labelWidth="auto"
    v-model="dataset">
</formkit>
```

## columns
Number of form items allowed per row.

> type: [Number, String]

<formkit
    :config="[
        {
            type: 'input',
            label: 'Name1',
            key: 'password',
            props: { placeholder: 'Please input name1', clearable: true }
        },
        {
            type: 'input',
            label: 'Name2',
            key: 'password',
            props: { placeholder: 'Please input name2', clearable: true }
        },
        {
            type: 'input',
            label: 'Name3',
            key: 'password',
            props: { placeholder: 'Please input name3', clearable: true }
        }
    ]"
    :columns="2"
    v-model="dataset">
</formkit>
<p>columns: 3</p>
<formkit
    :config="[
        {
            type: 'input',
            label: 'Name1',
            key: 'password',
            props: { placeholder: 'Please input name1', clearable: true }
        },
        {
            type: 'input',
            label: 'Name2',
            key: 'password',
            props: { placeholder: 'Please input name2', clearable: true }
        },
        {
            type: 'input',
            label: 'Name3',
            key: 'password',
            props: { placeholder: 'Please input name3', clearable: true }
        }
    ]"
    :columns="3"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'input',
            label: 'Name1',
            key: 'password',
            props: { placeholder: 'Please input name1', clearable: true }
        },
        {
            type: 'input',
            label: 'Name2',
            key: 'password',
            props: { placeholder: 'Please input name2', clearable: true }
        },
        {
            type: 'input',
            label: 'Name3',
            key: 'password',
            props: { placeholder: 'Please input name3', clearable: true }
        }
    ]"
    :columns="2"
    v-model="dataset">
</formkit>
<p>columns: 3</p>
<formkit
    :config="[
        {
            type: 'input',
            label: 'Name1',
            key: 'password',
            props: { placeholder: 'Please input name1', clearable: true }
        },
        {
            type: 'input',
            label: 'Name2',
            key: 'password',
            props: { placeholder: 'Please input name2', clearable: true }
        },
        {
            type: 'input',
            label: 'Name3',
            key: 'password',
            props: { placeholder: 'Please input name3', clearable: true }
        }
    ]"
    :columns="3"
    v-model="dataset">
</formkit>
```

## size
Size of the form item.

> Options: '' | 'large' | 'default' | 'small'

<formkit
    :config="[
        {
            type: 'input',
            label: 'Name1',
            key: 'password',
            props: { placeholder: 'Please input name1', clearable: true }
        }
    ]"
    size="large"
    v-model="dataset">
</formkit>

```vue{10}
<formkit
    :config="[
        {
            type: 'input',
            label: 'Name1',
            key: 'password',
            props: { placeholder: 'Please input name1', clearable: true }
        }
    ]"
    size="large"
    v-model="dataset">
</formkit>
```

## gap
Form item gap settings, type: `Object`

### gap.row
Horizontal spacing between form items. Type: `Number`

Default: 12

### gap.col
Vertical spacing between form items. Type: `Number`

Default: 20

<formkit
    :config="[
        {
            type: 'input',
            label: 'Name1',
            key: 'password',
            props: { placeholder: 'Please input name1', clearable: true }
        },
        {
            type: 'input',
            label: 'Name2',
            key: 'password',
            props: { placeholder: 'Please input name2', clearable: true }
        },
        {
            type: 'input',
            label: 'Name3',
            key: 'password',
            props: { placeholder: 'Please input name3', clearable: true }
        }
    ]"
    :columns="2"
    :gap="{
        row: 100,
        col: 50
    }"
    v-model="dataset">
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'input',
            label: 'Name1',
            key: 'password',
            props: { placeholder: 'Please input name1', clearable: true }
        },
        {
            type: 'input',
            label: 'Name2',
            key: 'password',
            props: { placeholder: 'Please input name2', clearable: true }
        },
        {
            type: 'input',
            label: 'Name3',
            key: 'password',
            props: { placeholder: 'Please input name3', clearable: true }
        }
    ]"
    :columns="2"
    :gap="{
        row: 100,
        col: 50
    }"
    v-model="dataset">
</formkit>
```

<script setup lang="ts">
import formkit, { setConfigure } from 'element-plus-formkit';
import { ref, computed } from 'vue';

const dataset = ref({})
</script>
