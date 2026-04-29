<template>
    <el-tree-select
        v-model="_value"
        :data="options"
        :class="$style['formkit-module-treeSelect']"
        :props="treeProps"
        v-bind="$attrs">
        <template
            v-for="name in Object.keys($slots)"
            #[name]="slotProps"
            :key="`slot-${name}`">
            <slot :name="name" v-bind="slotProps" />
        </template>
    </el-tree-select>
</template>

<script setup lang="ts">
import { ElTreeSelect } from 'element-plus'

const props = defineProps({
    modelValue: { default: null },
    options: { type: Array<any>, default: () => [] },
    labelKey: { type: String, default: 'name' },
    valueKey: { type: String, default: 'id' }
})

const emit = defineEmits(['update:modelValue']);

const $attrs = useAttrs() as Record<string, any> & { labelKey?: string; };

const treeProps = computed(() => ({ value: props.valueKey, label: props.labelKey }))

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
.formkit-module-treeSelect {
    min-width: 50px;
}
</style>