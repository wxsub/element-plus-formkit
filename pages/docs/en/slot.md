# 插槽

您可以插槽来扩展您的formkit

You can extend your formkit with slots!

## prepend

在您的formkit配置项前插入

Before your formkit configuration entry, insert the

<formkit
    :config="[
        {
            type: 'input',
            label: '姓名 (Name)',
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
            label: '姓名 (Name)',
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

## append
在您的formkit配置项后进行追加

Append after your formkit configuration entry

<formkit
    :config="[
        {
            type: 'input',
            label: '姓名 (Name)',
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
            label: '姓名 (Name)',
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

使用此插槽会会在您的整个`form`表单后进行追加，区别于`append`, `content`的样式干扰会大幅减少，必要时使用

Using this slot will append after your entire `form` form, unlike `append`, `content` style interference will be drastically reduced by using the

<formkit
    :config="[
        {
            type: 'input',
            label: '姓名 (Name)',
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
            label: '姓名 (Name)',
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
变量作用域插槽`[key]`, `[key]`为您的`config item`内的`key`，使用此插槽您可替换当前项的模块

Variable scope slot `[key]`, `[key]` is the `key` of your `config item`, using this slot you can replace the module of the current item.

::: warning
若您使用此插槽是希望替换当前项的模块，请移除当前项`type`，当然若您不这么做则当前项模块与您的`slot`共存

If you are using this slot because you want to replace the current item's module, remove the current item `type`, but if you don't then the current item's module will coexist with your `slot`.
:::

<formkit
    :config="[
        {
            type: 'input',
            label: '昵称 (nickname)',
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
            label: '昵称 (nickname)',
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
            label: '昵称 (nickname)',
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
            label: '昵称 (nickname)',
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