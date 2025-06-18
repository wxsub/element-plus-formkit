<template>
    <el-select v-model="_value" v-bind="$attrs">
        <el-option
                v-for="it in options"
                :key="it[$attrs.valueKey || 'id']"
                :label="it[$attrs.labelKey || 'name']"
                :value="it[$attrs.valueKey || 'id']">
            <div v-html="it[$attrs.labelKey || 'name']"/>
        </el-option>
    </el-select>
</template>

<script>
export default {
    name: 'FormKitSelect',
    model: { prop: 'value', event: 'change' },
    props: {
        value: { default: null },
        options: { type: Array, default: () => [] }
    },
    computed: {
        _value: {
            get() {
                const { multiple } = this.$attrs || {}
                return this.value || (multiple ? [] : null)
            },
            set(value) { this.$emit('change', value) }
        }
    }
}
</script>
