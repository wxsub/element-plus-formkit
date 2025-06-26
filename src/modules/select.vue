<template>
    <el-select v-model="_value" v-bind="$attrs">
        <el-option
                v-for="it in options"
                :key="it[$attrs?.valueKey || 'id']"
                :label="it[$attrs?.labelKey || 'name']"
                :value="it[$attrs?.valueKey || 'id']">
            <div v-html="it[$attrs.labelKey || 'name']"/>
        </el-option>
    </el-select>
</template>

<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'

const props = defineProps({
    modelValue: { default: null },
    options: { type: Array<any>, default: () => [] }
})

const emit = defineEmits(['update:modelValue']);

const $attrs = useAttrs() as { valueKey?: string; labelKey?: string };

const _value: any = computed({
    get: () => {
        const { multiple } = useAttrs() || {}
        return props.modelValue || (multiple ? [] : null)
    },
    set: (value) => {
        emit('update:modelValue', value)
    }
})
</script>
