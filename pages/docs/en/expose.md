# Expose

## validate
Immediately validate all items with `rules` rules. If no items have `rules` rules, this method will fail.

**This method provides a parameter that controls the validation of global prompt information.**

**Return type**: Promise

**Parameter type**: Boolean

## clearValidate
Immediately remove all items that have `rules` and have been validated. If there are no `rules` or no validated items, this method will fail.

**Return value**: Null

**Return value**: Null

**Example**:

<formkit
    ref="FormKitRef"
    :config="[
        { type: 'input', label: 'Name', rules: [{ required: true, message: 'Name cannot be empty' }], key: 'title' },
        { type: 'input', label: 'User Name', rules: [{ required: true, message: 'User Name cannot be empty' }], key: 'userName' },
        { type: 'input', label: 'Password', rules: [{ required: true, message: 'Password cannot be empty' }], key: 'password' },
        { type: 'inputNumber', label: 'Enter a number', key: 'ratio' },
    ]"
    v-model="dataset"
    size="large"
    :columns="2"
/>

<br />

<el-button color="#626aef" @click="validate" :loading="validateCompleted">validate</el-button>

<el-button @click="clearValidate">clearValidate</el-button>

::: code-tabs
@tab html
``` vue
<formkit
    ref="FormKitRef"
    :config="[
        { type: 'input', label: 'Name', rules: [{ required: true, message: 'Name cannot be empty' }], key: 'title' },
        { type: 'input', label: 'User Name', rules: [{ required: true, message: 'User Name cannot be empty' }], key: 'userName' },
        { type: 'input', label: 'Password', rules: [{ required: true, message: 'Password cannot be empty' }], key: 'password' },
        { type: 'inputNumber', label: 'Enter a number', key: 'ratio' },
    ]"
    v-model="dataset"
    size="large"
    :columns="2"
/>

<br />

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
Element-plus-formkit provides its own instance type Instance.

```js
import { type Instance } from 'element-plus-formkit';
```
:::

## buckets
Retrieves all remote return result items with the `requester` property.

**Return Value**: Array<{ key: string, value: any }>

<script setup lang="ts">
import formkit, { type Instance, setConfigure } from 'element-plus-formkit';
import { ref, computed } from 'vue';
import en from 'element-plus/es/locale/lang/en';

setConfigure('lang', en);

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