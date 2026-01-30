# Expose

## validate
立即校验所有存在`rules`规则的项，如果不存在`rules`规则的项此方法将失效。

**该方法提供一个形参，该参数用来接受校验失败时的回调函数**

**返回类型**: Promise

**参数类型**: Function

## clearValidate
立即清除所有存在`rules`规则且已经校验的项，如果不存在`rules`规则或不存在已经校验的项此方法将失效。

**返回值**: void

## resetFields
重置该表单项，将其值重置为初始值，并移除校验结果。

**返回值**: void

**参数类型**: FormItemProp

## scrollToField
滚动到指定的字段

**返回值**: void

**参数类型**: FormItemProp

## fields
获取所有项的上下文信息。

**返回值**: FormItemContext[]

## setInitialValues
设置表单字段的初始值。 当调用 resetFields 时，字段将重置为这些值。 只有存在于 initModel 中的字段才会被更新。

**返回值**: void

**参数类型**: Record<string, any>

## validateField
验证具体的某个字段。

**返回值**: Promise

**参数类型**: string

示例：

<formkit
    ref="FormKitRef"
    :config="[
        { type: 'input', label: '姓名', rules: [{ required: true, message: '姓名不能为空' }], key: 'title' },
        { type: 'input', label: '用户名', rules: [{ required: true, message: '用户名不能为空' }], key: 'userName' },
        { type: 'input', label: '密码', rules: [{ required: true, message: '密码不能为空' }], key: 'password' },
        { type: 'inputNumber', label: '输入数字', key: 'ratio' },
    ]"
    v-model="dataset"
    size="large"
/>

<br />

<el-button color="#626aef" @click="validate" :loading="validateCompleted">立即校验</el-button>

<el-button @click="clearValidate">清除校验</el-button>

<el-button color="#636363" @click="resetFields">resetFields</el-button>

<br />
<br />

<el-button color="#343434" @click="getfields">获取fields</el-button>

<el-button color="#999999" @click="scrollToField('title')">滚动到姓名</el-button>

<el-button color="#555" @click="validateField('title')">校验姓名</el-button>

::: code-tabs
@tab html
``` vue
<formkit
    ref="FormKitRef"
    :config="[
        { type: 'input', label: '姓名', rules: [{ required: true, message: '姓名不能为空' }], key: 'title' },
        { type: 'input', label: '用户名', rules: [{ required: true, message: '用户名不能为空' }], key: 'userName' },
        { type: 'input', label: '密码', rules: [{ required: true, message: '密码不能为空' }], key: 'password' },
        { type: 'inputNumber', label: '输入数字', key: 'ratio' },
    ]"
    v-model="dataset"
    size="large"
    :columns="2"
/>

<br />

<el-button color="#626aef" @click="validate" :loading="validateCompleted">立即校验</el-button>

<el-button @click="clearValidate">清除校验</el-button>

<el-button color="#636363" @click="resetFields">resetFields</el-button>

<br />
<br />

<el-button color="#343434" @click="getfields">获取fields</el-button>

<el-button color="#999999" @click="scrollToField('title')">滚动到姓名</el-button>

<el-button color="#555" @click="validateField('title')">校验姓名</el-button>
```

@tab script
``` vue
<script setup lang="ts">
import formkit, { type Instance } from 'element-plus-formkit';
import { ref, computed } from 'vue';

const dataset = ref({}), validateCompleted = ref(false);

const FormKitRef = ref<Instance>()

async function validate() {
    try {
        validateCompleted.value = true;
        await FormKitRef.value.validate(true);
    } finally {
        validateCompleted.value = false;
    }
}

function clearValidate() {
    FormKitRef.value.clearValidate();
}

function resetFields() {
    FormKitRef.value.resetFields();
}

function getfields() {
    console.log(FormKitRef.value.fields);
}

function scrollToField(key: string) {
    FormKitRef.value.scrollToField(key);
}

function validateField(key: string) {
    FormKitRef.value.validateField(key);
}
</script>
```
:::

::: warning
Element-plus-formkit提供自身实例的ts类型Instance。

```js
import { type Instance } from 'element-plus-formkit';
```
:::

## buckets
获取所有所有`requester`属性远程返回结果数据项。

**返回值**: Array<{ key: string, value: any }>

<script setup lang="ts">
import formkit, { type Instance } from 'element-plus-formkit';
import { ref, computed } from 'vue';

const dataset = ref({}), validateCompleted = ref(false);

const FormKitRef = ref<Instance>()

async function validate() {
    try {
        validateCompleted.value = true;
        await FormKitRef.value.validate(true);
    } finally {
        validateCompleted.value = false;
    }
}

function clearValidate() {
    FormKitRef.value.clearValidate();
}

function resetFields() {
    FormKitRef.value.resetFields();
}

function getfields() {
    console.log(FormKitRef.value.fields);
}

function scrollToField(key: string) {
    FormKitRef.value.scrollToField(key);
}

function validateField(key: string) {
    FormKitRef.value.validateField(key);
}
</script>