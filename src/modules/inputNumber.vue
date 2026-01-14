<script setup lang="ts">
import { ElInputNumber } from 'element-plus'
const props = defineProps({
    prefix: { type: String, default: null },
    suffix: { type: String, default: null },
    modelValue: { type: [String, Number, Array] }
})

const emit = defineEmits(['update:modelValue']);

const dataset: any = computed({
    get: () => {
        return props.modelValue || null
    },
    set: (value) => {
        emit('update:modelValue', value)
    }
})
</script>

<template>
    <el-input-number v-model="dataset" v-bind="$attrs">
        <template #suffix v-if="suffix">
            <span v-html="suffix" />
        </template>
        <template #prefix v-if="prefix">
            <span v-html="prefix" />
        </template>
        <template
            v-for="name in Object.keys($slots)"
            #[name]="slotProps"
            :key="`slot-${name}`">
            <slot :name="name" v-bind="slotProps" />
        </template>
    </el-input-number>
</template>
