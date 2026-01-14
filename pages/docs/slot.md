# 插槽

您可以插槽来扩展您的formkit

## prepend

在您的formkit配置项前插入

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
    <template #prepend>
        <el-col :span="24">
            <b>这是prepend插槽的内容</b>
        </el-col>
    </template>
</formkit>

```vue{11-15}
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
    <template #prepend>
        <el-col :span="24">
            <b>这是prepend插槽的内容</b>
        </el-col>
    </template>
</formkit>
```

## append
在您的formkit配置项后进行追加

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
    <template #append>
        <el-col :span="24">
            <b>这是append插槽的内容</b>
        </el-col>
    </template>
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
    <template #append>
        <el-col :span="24">
            <b>这是append插槽的内容</b>
        </el-col>
    </template>
</formkit>
```

## content

使用此插槽会会在您的整个`form`表单后进行追加，区别于`append`, `content`的样式干扰会大幅减少，必要时使用

<formkit
    :config="[
        {
            type: 'input',
            label: '姓名',
            key: 'name',
            props: { placeholder: '请输入姓名', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #content="scope">
        <b>这是content插槽的内容</b>
        <p>content插槽传递的参数: <code>{{ scope }}</code></p>
    </template>
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'input',
            label: '姓名',
            key: 'name',
            props: { placeholder: '请输入姓名', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #content="scope">
        <b>这是content插槽的内容</b>
        <p>content插槽传递的参数: <code>{{ scope }}</code></p>
    </template>
</formkit>
```

## [key]
变量作用域插槽`[key]`, `[key]`为您的`config item`内的`key`，使用此插槽您可替换当前项的模块

::: warning
若您使用此插槽是希望替换当前项的模块，请移除当前项`type`，当然若您不这么做则当前项模块与您的`slot`共存
:::

<formkit
    :config="[
        {
            type: 'input',
            label: '昵称',
            key: 'nickname',
            props: { placeholder: '请输入昵称', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #nickname="scope">
        <b>这是nickname插槽的内容</b>
        <p>nickname插槽传递的参数: <code>{{ scope }}</code></p>
    </template>
</formkit>

**当然你也可以不指定type模块而只展示您的插槽内容**

<formkit
    :config="[
        {
            label: '昵称',
            key: 'nickname',
            props: { placeholder: '请输入昵称', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #nickname="scope">
        <b>这是nickname插槽的内容</b>
        <p>nickname插槽传递的参数: <code>{{ scope }}</code></p>
    </template>
</formkit>

```vue
<formkit
    :config="[
        {
            type: 'input',
            label: '昵称',
            key: 'nickname',
            props: { placeholder: '请输入昵称', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #nickname="scope">
        <b>这是nickname插槽的内容</b>
        <p>nickname插槽传递的参数: <code>{{ scope }}</code></p>
    </template>
</formkit>

<formkit
    :config="[
        {
            label: '昵称',
            key: 'nickname',
            props: { placeholder: '请输入昵称', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #nickname="scope">
        <b>这是nickname插槽的内容</b>
        <p>nickname插槽传递的参数: <code>{{ scope }}</code></p>
    </template>
</formkit>
```

## 原生模块插槽

如需使用EL原生模块[ELSelect slots](https://element-plus.org/zh-CN/component/select#select-slots)插槽您需要使用特定格式定义您的具名插槽名称使用：

**[当前配置项的key]-[原生插槽名称]**

<formkit
    :config="[
        {
            label: '性别',
            type: 'select',
            key: 'sex',
            props: { placeholder: '请输入昵称', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #sex-prefix>
        prefix内容
    </template>
    <template #sex-empty>
        empty内容
    </template>
</formkit>

```vue
<formkit
    :config="[
        {
            label: '性别',
            type: 'select',
            key: 'sex',
            props: { placeholder: '请输入昵称', clearable: true }
        }
    ]"
    v-model="dataset">
    <template #sex-prefix>
        prefix内容
    </template>
    <template #sex-empty>
        empty内容
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