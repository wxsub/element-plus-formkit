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
Length of the form item label, for example '50px'. form-item as a direct child of Form will inherit this value. You can use auto.

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

::: tip
When the `columns` value is set to `auto`, the width of each form item is automatically calculated, and line breaks occur based on the width. In this case, the `label-width` property becomes ineffective.
:::

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
    columns="auto"
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
    columns="auto"
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

## rows
Table row item settings, type: `Object`

### rows.rowGap
Horizontal spacing between form items. Type: `Number`

Default: 5

### rows.columnGap
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
    :rows="{
        rowGap: 50,
        columnGap: 50
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
    :rows="{
        rowGap: 50,
        columnGap: 50
    }"
    v-model="dataset">
</formkit>
```

<script setup lang="ts">
import formkit, { setConfigure } from 'element-plus-formkit';
import { ref, computed } from 'vue';

const dataset = ref({})
</script>
