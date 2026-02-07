<template>
    <el-select v-model="_value" v-bind="$attrs" class="formkit-module-select" @change="onChange" ref="Ref">
        <el-option
                v-for="it in options"
                :key="it[$attrs?.valueKey || 'id']"
                :label="it[$attrs?.labelKey || 'name']"
                :value="it[$attrs?.valueKey || 'id']">
            <div v-html="it[$attrs.labelKey || 'name']"/>
        </el-option>
        <template
            v-for="name in Object.keys($slots)"
            #[name]="slotProps"
            :key="`slot-${name}`">
            <slot :name="name" v-bind="slotProps" />
        </template>
    </el-select>
</template>

<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'

const Ref = ref<InstanceType<typeof ElSelect>>()

const props = defineProps({
    modelValue: { default: null },
    options: { type: Array<any>, default: () => [] },
    onChoose: { type: [Function, null], default: null }
})

const emit = defineEmits(['update:modelValue']);

const $attrs = useAttrs() as { valueKey?: string; labelKey?: string };

const _value: any = computed({
    get: () => {
        const multiple = useAttrs()?.multiple;
        return props.modelValue ?? (multiple ? [] : null);
    },
    set: (value) => {
        emit('update:modelValue', value)
    }
})

async function onChange(value: any) {
    await nextTick()
    const { selectedLabel } = Ref?.value || {}
    props.onChoose?.(value, selectedLabel, props.options)
}
</script>

<style scoped lang="scss">
.formkit-module-select {
    min-width: 50px;
}
</style>
