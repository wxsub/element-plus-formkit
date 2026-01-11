Element-Plus-Formkit Core Components Include: {{ Array.from(new Set(FormKitConfig.map((it) => (it.type)))).join(" 、 ") }}

<p>{{ dataset }}</p>

<div>
    <formkit v-model="dataset" :config="FormKitConfig" ref="FormKitRef" />
    <el-button color="#626aef" @click="submit" :loading="loading">Verify immediately</el-button>
</div>

::: code-tabs
@tab Template
```vue
<div>
    <formkit v-model="dataset" :config="FormKitConfig" ref="FormKitRef" />
    <el-button color="#626aef" @click="submit" :loading="loading">Verify immediately</el-button>
</div>
```

@tab TypeScript
```ts
<script setup lang="ts">
import formkit, { setConfigure, type Instance } from 'element-plus-formkit';
import { ref, computed } from 'vue';
import en from 'element-plus/es/locale/lang/en';

setConfigure('lang', en);

const dataset = ref({}),
    loading = ref(false),
    FormKitRef = ref<Instance>();

const FormKitConfig = computed(() => {
    return [
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please enter your name' }
        },
        {
            type: 'select',
            label: 'Sex',
            key: 'sex',
            props: { placeholder: 'Please select your sex' },
            options: [
                { name: 'Man', id: 1 },
                { name: 'Woman', id: 2 }
            ]
        },
        {
            type: 'datePicker',
            label: 'Birthday',
            key: 'birthday',
            props: {
                placeholder: 'Please select your birthday',
                valueFormat: "YYYY-MM-DD",
                type: "date",
                style: { width: '100%' }
            }
        },
        {
            type: 'datePicker',
            label: 'I.D. validity period',
            key: 'idDate',
            props: {
                placeholder: 'Please select the validity period of your ID',
                valueFormat: "YYYY-MM-DD",
                type: "daterange",
                startPlaceholder: 'Start Time',
                endPlaceholder: 'End Time',
                style: { width: '100%' }
            }
        },
        {
            type: 'inputNumber',
            label: 'Input number',
            rules: [
                { required: true, message: 'Input number cannot be empty' }
            ],
            key: 'inputNumber',
            props: {
                style: { width: '100%' },
                placeholder: 'Please enter a number',
                min: 0
            }
        },
        {
            type: 'rate',
            label: 'Rate',
            key: 'sex'
        },
        {
            type: 'radio',
            label: 'Show hidden items',
            key: 'show',
            options: [
                { name: 'Yes', id: true },
                { name: 'No', id: false }
            ]
        },
        {
            type: 'input',
            label: 'Hidden item',
            key: 'password',
            visible: { key: 'show' },
            props: { placeholder: 'Please enter a hidden item' }
        }
    ]
})

async function submit() {
    try {
        loading.value = true;
        await new Promise(resolve => setTimeout(resolve, 3000));
        await FormKitRef.value.validate(true);
    } finally {
        loading.value = false;
    }
}
</script>
```
:::

::: tip
The [visible property](/element-plus-formkit/en/config-api.html#config-visible) supports: Object, Array, Boolean
:::

<script setup lang="ts">
import formkit, { setConfigure, type Instance } from 'element-plus-formkit';
import { ref, computed } from 'vue';
import en from 'element-plus/es/locale/lang/en';

setConfigure('lang', en);

const dataset = ref({}),
    loading = ref(false),
    FormKitRef = ref<Instance>();

const FormKitConfig = computed(() => {
    return [
        {
            type: 'input',
            label: 'Name',
            key: 'password',
            props: { placeholder: 'Please enter your name' }
        },
        {
            type: 'select',
            label: 'Sex',
            key: 'sex',
            props: { placeholder: 'Please select your sex' },
            options: [
                { name: 'Man', id: 1 },
                { name: 'Woman', id: 2 }
            ]
        },
        {
            type: 'datePicker',
            label: 'Birthday',
            key: 'birthday',
            props: {
                placeholder: 'Please select your birthday',
                valueFormat: "YYYY-MM-DD",
                type: "date",
                style: { width: '100%' }
            }
        },
        {
            type: 'datePicker',
            label: 'I.D. validity period',
            key: 'idDate',
            props: {
                placeholder: 'Please select the validity period of your ID',
                valueFormat: "YYYY-MM-DD",
                type: "daterange",
                startPlaceholder: 'Start Time',
                endPlaceholder: 'End Time',
                style: { width: '100%' }
            }
        },
        {
            type: 'inputNumber',
            label: 'Input number',
            rules: [
                { required: true, message: 'Input number cannot be empty' }
            ],
            key: 'inputNumber',
            props: {
                style: { width: '100%' },
                placeholder: 'Please enter a number',
                min: 0
            }
        },
        {
            type: 'rate',
            label: 'Rate',
            key: 'sex'
        },
        {
            type: 'radio',
            label: 'Show hidden items',
            key: 'show',
            options: [
                { name: 'Yes', id: true },
                { name: 'No', id: false }
            ]
        },
        {
            type: 'input',
            label: 'Hidden item',
            key: 'password',
            visible: { key: 'show' },
            props: { placeholder: 'Please enter a hidden item' }
        }
    ]
})

async function submit() {
    try {
        loading.value = true;
        await new Promise(resolve => setTimeout(resolve, 3000));
        await FormKitRef.value.validate(true);
    } finally {
        loading.value = false;
    }
}
</script>
