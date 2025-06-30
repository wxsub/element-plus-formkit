Element-Plus-Formkit基础组件包含: {{ Array.from(new Set(FormKitConfig.map((it) => (it.type)))).join(" 、 ") }}

<div>
    <formkit v-model="dataset" :config="FormKitConfig" ref="dataSetFormRef" />
    <el-button color="#626aef" @click="submit">表单校验 form validation</el-button>
</div>

::: code-tabs
@tab Template
```vue
<formkit v-model="dataset" :config="FormKitConfig" />
```

@tab TypeScript
```ts
<script setup>
import { ref, computed } from 'vue';

const dataset = ref({})

const FormKitConfig = computed(() => {
    return [
        {
            type: 'input',
            label: '姓名 (Name)',
            key: 'password',
            props: { placeholder: '请输入姓名' }
        },
        {
            type: 'select',
            label: '性别 (Sex)',
            key: 'sex',
            props: { placeholder: '请选择性别' },
            options: [
                { name: '男 man', id: 1 },
                { name: '女 woman', id: 2 }
            ]
        },
        {
            type: 'datePicker',
            label: '出生日期 (Birthday)',
            key: 'birthday',
            props: {
                placeholder: '请选择出生日期',
                valueFormat: "YYYY-MM-DD",
                type: "date",
                style: { width: '100%' }
            }
        },
        {
            type: 'datePicker',
            label: '身份证有效期 (I.D. validity period)',
            key: 'idDate',
            props: {
                placeholder: '请选择身份证有效期',
                valueFormat: "YYYY-MM-DD",
                type: "daterange",
                startPlaceholder: '开始时间 Start Time',
                endPlaceholder: '结束时间 End Time',
                style: { width: '100%' }
            }
        },
        {
            type: 'inputNumber',
            label: '输入数字 (inputNumber)',
            rules: [
                { required: true, message: '输入数字不能为空' }
            ],
            key: 'inputNumber',
            props: {
                style: { width: '100%' },
                placeholder: '请输入数字',
                min: 0
            }
        },
        {
            type: 'rate',
            label: '等级 (Rate)',
            key: 'sex'
        },
        {
            type: 'radio',
            label: '是否显示隐藏项 (Show hidden items)',
            key: 'show',
            options: [
                { name: '是 Yes', id: true },
                { name: '否 No', id: false }
            ]
        },
        {
            type: 'input',
            label: '隐藏项 (hidden item)',
            key: 'password',
            visible: { key: 'show' },
            props: { placeholder: '请输入隐藏项' }
        }
    ]
})
</script>
```
:::

::: tip
visible属性支持：Object、Array、Boolean
:::

<script setup lang="ts">
import type { Instance } from 'element-plus-formkit'
import { ref, computed } from 'vue';

const dataset = ref({}),
    dataSetFormRef = ref<Instance>();

async function submit() {
    await dataSetFormRef.value?.validate()
}

const FormKitConfig = computed(() => {
    return [
        {
            type: 'input',
            label: '姓名 (Name)',
            key: 'password',
            props: { placeholder: '请输入姓名' }
        },
        {
            type: 'select',
            label: '性别 (Sex)',
            key: 'sex',
            props: { placeholder: '请选择性别' },
            options: [
                { name: '男 man', id: 1 },
                { name: '女 woman', id: 2 }
            ]
        },
        {
            type: 'datePicker',
            label: '出生日期 (Birthday)',
            key: 'birthday',
            props: {
                placeholder: '请选择出生日期',
                valueFormat: "YYYY-MM-DD",
                type: "date",
                style: { width: '100%' }
            }
        },
        {
            type: 'datePicker',
            label: '身份证有效期 (I.D. validity period)',
            key: 'idDate',
            props: {
                placeholder: '请选择身份证有效期',
                valueFormat: "YYYY-MM-DD",
                type: "daterange",
                startPlaceholder: '开始时间 Start Time',
                endPlaceholder: '结束时间 End Time',
                style: { width: '100%' }
            }
        },
        {
            type: 'inputNumber',
            label: '输入数字 (inputNumber)',
            rules: [
                { required: true, message: '输入数字不能为空' }
            ],
            key: 'inputNumber',
            props: {
                style: { width: '100%' },
                placeholder: '请输入数字',
                min: 0
            }
        },
        {
            type: 'rate',
            label: '等级 (Rate)',
            key: 'sex'
        },
        {
            type: 'radio',
            label: '是否显示隐藏项 (Show hidden items)',
            key: 'show',
            options: [
                { name: '是 Yes', id: true },
                { name: '否 No', id: false }
            ]
        },
        {
            type: 'input',
            label: '隐藏项 (hidden item)',
            key: 'password',
            visible: { key: 'show' },
            props: { placeholder: '请输入隐藏项' }
        }
    ]
})
</script>