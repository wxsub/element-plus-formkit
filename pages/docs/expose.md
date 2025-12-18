# Expose

## validate
立即校验所有存在`rules`规则的项，如果不存在`rules`规则的项此方法将失效。

This method immediately checks all items that have `rules` rules; if no item has `rules` rules, this method will fail.

**该方法提供一个形参，该参数用来控制校验全局提示信息**

**This method provides a parameter that controls the validation of global prompt information.**

**返回类型(Return type)**: Promise

**参数类型(Parameter type)**: Boolean

## clearValidate
立即清除所有存在`rules`规则且已经校验的项，如果不存在`rules`规则或不存在已经校验的项此方法将失效。

This method immediately removes all items that have `rules` and have been validated. If there are no `rules` or no validated items, this method will fail.

**返回值(Return)**: Null

示例：

<formkit
    ref="FormKitRef"
    :config="[
        { type: 'input', label: '姓名 (Name)', rules: [{ required: true, message: '姓名 (Name)不能为空' }], key: 'title' },
        { type: 'input', label: '用户名（User Name）', rules: [{ required: true, message: '用户名（User Name）不能为空' }], key: 'userName' },
        { type: 'input', label: '密码（password）', rules: [{ required: true, message: '密码（password）不能为空' }], key: 'password' },
        { type: 'inputNumber', label: '输入数字 (inputNumber)', key: 'ratio' },
    ]"
    v-model="dataset"
    size="large"
    :columns="2"
/>

<el-button color="#626aef" @click="validate" :loading="validateCompleted">validate</el-button>

<el-button @click="clearValidate">clearValidate</el-button>

::: code-tabs
@tab html
``` vue
<formkit
    ref="FormKitRef"
    :config="[
        { type: 'input', label: '姓名 (Name)', rules: [{ required: true, message: '姓名 (Name)不能为空' }], key: 'title' },
        { type: 'input', label: '用户名（User Name）', rules: [{ required: true, message: '用户名（User Name）不能为空' }], key: 'userName' },
        { type: 'input', label: '密码（password）', rules: [{ required: true, message: '密码（password）不能为空' }], key: 'password' },
        { type: 'inputNumber', label: '输入数字 (inputNumber)', key: 'ratio' },
    ]"
    v-model="dataset"
    size="large"
    :columns="2"
/>

<el-button color="#626aef" @click="validate" :loading="validateCompleted">validate</el-button>

<el-button @click="clearValidate">clearValidate</el-button>
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
</script>
```
:::

::: warning
Element-plus-formkit提供自身实例的ts类型Instance。

Element-plus-formkit provides its own instance type Instance.

```js
import { type Instance } from 'element-plus-formkit';
```
:::


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
</script>