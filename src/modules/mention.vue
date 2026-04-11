<template>
    <el-mention
        v-model="_value"
        v-bind="$attrs"
        :class="$style['formkit-module-mention']"
        :props="{ label: ($attrs as any)?.labelKey || 'name', value: ($attrs as any)?.valueKey || 'id', disabled: ($attrs as any)?.disabled || false }"
        :options="options">
        <template
            v-for="name in Object.keys($slots)"
            #[name]="slotProps"
            :key="`slot-${name}`">
            <slot :name="name" v-bind="slotProps" />
        </template>
    </el-mention>
</template>

<script setup lang="ts">
import { ElMention } from 'element-plus'

const props = defineProps({
    modelValue: { default: null },
    options: { type: Array<any>, default: () => [] }
})

const emit = defineEmits(['update:modelValue']);

const $attrs = useAttrs() as Record<string, any> & { labelKey?: string; };

const _value: any = computed({
    get: () => {
        return props.modelValue ?? null;
    },
    set: (value) => {
        emit('update:modelValue', value)
    }
})
</script>

<style module lang="scss">
.formkit-module-mention {
    min-width: 50px;
}
</style>