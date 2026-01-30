# Expose

## validate
Immediately validate all items with `rules` rules. If no items have `rules` rules, this method will fail.

This method provides a formal parameter that accepts a callback function when validation fails.

**Return type**: Promise

**Parameter type**: Function

## clearValidate
Immediately remove all items that have `rules` and have been validated. If there are no `rules` or no validated items, this method will fail.

**Return value**: Null

**Return value**: Null

## resetFields
Resets this form item to its initial values and clears validation results.

**Return Value**: void

**Parameter Type**: FormItemProp

## scrollToField
Scrolls to the specified field.

**Return Value**: void

**Parameter Type**: FormItemProp

## fields
Retrieve context information for all items.

**Return Value**: FormItemContext[]

## setInitialValues
Set initial values for form fields. Fields will be reset to these values when resetFields is called. Only fields present in initModel will be updated.

**Return Value**: void

**Parameter Type**: Record<string, any>

## validateField
Validate a specific field.

**Return Value**: Promise

**Parameter Type**: string

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

<el-button color="#636363" @click="resetFields">resetFields</el-button>

<br />
<br />

<el-button color="#343434" @click="getfields">Get fields</el-button>

<el-button color="#999999" @click="scrollToField('title')">Scroll to Name</el-button>

<el-button color="#555" @click="validateField('title')">Validate Name</el-button>

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