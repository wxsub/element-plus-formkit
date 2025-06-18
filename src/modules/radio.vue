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

<script>
export default {
  name: 'FormKitRadio',
  model: { prop: 'value', event: 'change' },
  props: {
    value: { default: null },
    type: { default: 'default' },
    options: { type: Array, default: () => [] }
  },
  computed: {
    _value: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('change', newVal)
      }
    }
  }
}
</script>
