# 组件道具（props）

## model-value / v-model
组件绑定数据源，类型：`Object`

## config
组件配置项，具体参数请查阅[Config Api](/config-api.md)。类型：`Array`

## disabled
禁用整个表单。类型：`Boolean`

<formkit
    :config="[
        {
            type: 'input',
            label: '姓名',
            key: 'password',
            props: { placeholder: '请输入姓名', clearable: true }
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
            label: '姓名',
            key: 'password',
            props: { placeholder: '请输入姓名', clearable: true }
        }
    ]"
    :disabled="true"
    v-model="dataset">
</formkit>
```

## labelPosition
表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性

> 可选项：'left' | 'right' | 'top'

<formkit
    :config="[
        {
            type: 'input',
            label: '姓名',
            key: 'password',
            props: { placeholder: '请输入姓名', clearable: true }
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
            label: '姓名',
            key: 'password',
            props: { placeholder: '请输入姓名', clearable: true }
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
            label: '姓名',
            key: 'password',
            props: { placeholder: '请输入姓名', clearable: true }
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
            label: '姓名',
            key: 'password',
            props: { placeholder: '请输入姓名', clearable: true }
        }
    ]"
    labelPosition="right"
    v-model="dataset">
</formkit>
```

## labelWidth
标签的长度，类型：`Number`

例如 '50'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。

## columns
每行允许存在的表单项。

> type: [Number, String]

<formkit
    :config="[
        {
            type: 'input',
            label: '姓名1',
            key: 'password',
            props: { placeholder: '请输入姓名1', clearable: true }
        },
        {
            type: 'input',
            label: '姓名2',
            key: 'password',
            props: { placeholder: '请输入姓名2', clearable: true }
        },
        {
            type: 'input',
            label: '姓名3',
            key: 'password',
            props: { placeholder: '请输入姓名3', clearable: true }
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
            label: '姓名1',
            key: 'password',
            props: { placeholder: '请输入姓名1', clearable: true }
        },
        {
            type: 'input',
            label: '姓名2',
            key: 'password',
            props: { placeholder: '请输入姓名2', clearable: true }
        },
        {
            type: 'input',
            label: '姓名3',
            key: 'password',
            props: { placeholder: '请输入姓名3', clearable: true }
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
            label: '姓名1',
            key: 'password',
            props: { placeholder: '请输入姓名1', clearable: true }
        },
        {
            type: 'input',
            label: '姓名2',
            key: 'password',
            props: { placeholder: '请输入姓名2', clearable: true }
        },
        {
            type: 'input',
            label: '姓名3',
            key: 'password',
            props: { placeholder: '请输入姓名3', clearable: true }
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
            label: '姓名1',
            key: 'password',
            props: { placeholder: '请输入姓名1', clearable: true }
        },
        {
            type: 'input',
            label: '姓名2',
            key: 'password',
            props: { placeholder: '请输入姓名2', clearable: true }
        },
        {
            type: 'input',
            label: '姓名3',
            key: 'password',
            props: { placeholder: '请输入姓名3', clearable: true }
        }
    ]"
    :columns="3"
    v-model="dataset">
</formkit>
```

::: tip
columns 值为 auto 时，会自动计算每个表单项的宽度, 并根据宽度自动换行, 此时 label-width 会失效。
:::

<formkit
    :config="[
        {
            type: 'input',
            label: '姓名1',
            key: 'password',
            props: { placeholder: '请输入姓名1', clearable: true }
        },
        {
            type: 'input',
            label: '姓名2',
            key: 'password',
            props: { placeholder: '请输入姓名2', clearable: true }
        },
        {
            type: 'input',
            label: '姓名3',
            key: 'password',
            props: { placeholder: '请输入姓名3', clearable: true }
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
            label: '姓名1',
            key: 'password',
            props: { placeholder: '请输入姓名1', clearable: true }
        },
        {
            type: 'input',
            label: '姓名2',
            key: 'password',
            props: { placeholder: '请输入姓名2', clearable: true }
        },
        {
            type: 'input',
            label: '姓名3',
            key: 'password',
            props: { placeholder: '请输入姓名3', clearable: true }
        }
    ]"
    columns="auto"
    v-model="dataset">
</formkit>
```

## size
表单项尺寸。

> 可选项：'' | 'large' | 'default' | 'small'

<formkit
    :config="[
        {
            type: 'input',
            label: '姓名1',
            key: 'password',
            props: { placeholder: '请输入姓名1', clearable: true }
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
            label: '姓名1',
            key: 'password',
            props: { placeholder: '请输入姓名1', clearable: true }
        }
    ]"
    size="large"
    v-model="dataset">
</formkit>
```

## rows
表格行项目设置，类型：`Object`

### rows.rowGap
表单项水平横向间距。类型：`Number`

默认: 5

### rows.columnGap
表单项垂直纵向间距。类型：`Number`

默认: 20

<formkit
    :config="[
        {
            type: 'input',
            label: '姓名1',
            key: 'password',
            props: { placeholder: '请输入姓名1', clearable: true }
        },
        {
            type: 'input',
            label: '姓名2',
            key: 'password',
            props: { placeholder: '请输入姓名2', clearable: true }
        },
        {
            type: 'input',
            label: '姓名3',
            key: 'password',
            props: { placeholder: '请输入姓名3', clearable: true }
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
            label: '姓名1',
            key: 'password',
            props: { placeholder: '请输入姓名1', clearable: true }
        },
        {
            type: 'input',
            label: '姓名2',
            key: 'password',
            props: { placeholder: '请输入姓名2', clearable: true }
        },
        {
            type: 'input',
            label: '姓名3',
            key: 'password',
            props: { placeholder: '请输入姓名3', clearable: true }
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