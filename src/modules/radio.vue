<template>
  <el-radio-group v-model="_value" v-bind="$attrs">
    <el-radio
        v-for="(it, idx) in options"
        v-if="type === 'default'"
        :disabled="it.disabled"
        :value="it[$attrs.valueKey || 'id']"
        :key="idx">
      {{ it[$attrs.labelKey || 'name'] }}
    </el-radio>
    <el-radio-button
        v-for="(it, idx) in options"
        v-if="type === 'button'"
        :value="it[$attrs.valueKey || 'id']"
        :key="idx">
      {{ it[$attrs.labelKey || 'name'] }}
    </el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ElRadio, ElRadioGroup, ElRadioButton } from 'element-plus'

const props = defineProps({
    modelValue: { default: null },
    type: { default: 'default' },
    options: { type: Array<any>, default: () => [] }
})

const emit = defineEmits(['update:modelValue']);

const $attrs = useAttrs() as { valueKey?: string; labelKey?: string };

const _value: any = computed({
    get: () => {
        const { multiple } = useAttrs() || {}
        return props.modelValue
    },
    set: (value) => {
        emit('update:modelValue', value)
    }
})
</script>