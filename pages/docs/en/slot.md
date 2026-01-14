# 插槽
You can extend your formkit with slots!

## prepend
Before your formkit configuration entry, insert the

<formkit
    :config="[
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please enter your name', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #prepend>
        <el-col :span="24">
            <b>This is prepend Content</b>
        </el-col>
    </template>
</formkit>

```vue{11-15}
<formkit
    :config="[
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please enter your name', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #prepend>
        <el-col :span="24">
            <b>This is prepend Content</b>
        </el-col>
    </template>
</formkit>
```

## appen
Append after your formkit configuration entry

<formkit
    :config="[
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please enter your name', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #append>
        <el-col :span="24">
            <b>This is append Content</b>
        </el-col>
    </template>
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please enter your name', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #append>
        <el-col :span="24">
            <b>This is append Content</b>
        </el-col>
    </template>
</formkit>
```

## content
Using this slot will append after your entire `form` form, unlike `append`, `content` style interference will be drastically reduced by using the

<formkit
    :config="[
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please enter your name', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #content="scope">
        <b>This is append Content</b>
        <p>Parameters passed by the content slot: <code>{{ scope }}</code></p>
    </template>
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please enter your name', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #content="scope">
        <b>This is append Content</b>
        <p>Parameters passed by the content slot: <code>{{ scope }}</code></p>
    </template>
</formkit>
```

## [key]
Variable scope slot `[key]`, `[key]` is the `key` of your `config item`, using this slot you can replace the module of the current item.

::: warning
If you are using this slot because you want to replace the current item's module, remove the current item `type`, but if you don't then the current item's module will coexist with your `slot`.
:::

<formkit
    :config="[
        {
            type: 'input',
            label: 'nickname',
            key: 'nickname',
            props: { placeholder: 'Please enter your nickname', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #nickname="scope">
        <b>This is nickname slot Content</b>
        <p>Parameters passed by the content slot: <code>{{ scope }}</code></p>
    </template>
</formkit>

<formkit
    :config="[
        {
            type: 'input',
            label: 'nickname',
            key: 'nickname',
            props: { placeholder: 'Please enter your nickname', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #nickname="scope">
        <b>This is nickname slot Content</b>
        <p>Parameters passed by the content slot: <code>{{ scope }}</code></p>
    </template>
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'input',
            label: 'nickname',
            key: 'nickname',
            props: { placeholder: 'Please enter your nickname', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #nickname="scope">
        <b>This is nickname slot Content</b>
        <p>Parameters passed by the content slot: <code>{{ scope }}</code></p>
    </template>
</formkit>

<formkit
    :config="[
        {
            label: 'nickname',
            key: 'nickname',
            props: { placeholder: 'Please enter your nickname', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #nickname="scope">
        <b>This is nickname slot Content</b>
        <p>Parameters passed by the content slot: <code>{{ scope }}</code></p>
    </template>
</formkit>
```

## Native module slots

To use the native EL module [ELSelect slots](https://element-plus.org/zh-CN/component/select#select-slots) slots, you need to define your named slot name using a specific format:

**[Current configuration item key]-[Native slot name]**

<formkit
    :config="[
        {
            label: 'Sex',
            type: 'select',
            key: 'sex',
            props: { placeholder: 'Please enter your Sex.', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #sex-prefix>
        prefix content
    </template>
    <template #sex-empty>
        empty content
    </template>
</formkit>

```vue
<formkit
    :config="[
        {
            label: 'Sex',
            type: 'select',
            key: 'sex',
            props: { placeholder: 'Please enter your Sex.', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #sex-prefix>
        prefix content
    </template>
    <template #sex-empty>
        empty content
    </template>
</formkit>
```

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
                { name: 'Selector item one', id: 1 },
                { name: 'Selector item two', id: 2 },
                { name: 'Selector item three', id: 3 }
            ]
           })
        }, 2000)
    })
}
</script>