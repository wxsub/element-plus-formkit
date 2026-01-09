Element-Plus-Formkit Core Components Include: {{ Array.from(new Set(FormKitConfig.map((it) => (it.type)))).join(" 、 ") }}

<p>{{ dataset }}</p>

<div>
    <formkit v-model="dataset" :config="FormKitConfig" ref="dataSetFormRef" />
    <el-button color="#626aef" @click="submit">Verify immediately</el-button>
</div>

::: code-tabs
@tab Template
```vue
<formkit v-model="dataset" :config="FormKitConfig" />
```

@tab TypeScript
```ts
<script setup>
import formkit from 'element-plus-formkit'
import { ref, computed } from 'vue';

const dataset = ref({})

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
</script>
```
:::

::: tip
The [visible property](/element-plus-formkit/en/config-api.html#config-visible) supports: Object, Array, Boolean
:::

<script setup>
import formkit from 'element-plus-formkit'
import { ref, computed } from 'vue';

const dataset = ref({})

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
</script>
