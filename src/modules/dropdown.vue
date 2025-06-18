<script>
import { ArrowDown } from '@element-plus/icons-vue'
export default {
  name: "dropdown",
  model: { prop: 'value', event: 'change' },
  components: { ArrowDown },
  props: {
    value: { required: true },
    options: { type: Array, default: () => [] }
  },
  computed: {
    _value: {
      get() { return this.value || null },
      set(value) {
        this.$emit('change', value)
      }
    },
    label() {
      try {
        if (Array.isArray(this.options) && this.options.length === 0) return this.$attrs.placeholder || '请选择'
        const cur = this._value === null ? {} : this.options.find(it => it[this.$attrs.valueKey || 'id'] === this._value)
        return cur[this.$attrs.labelKey || 'name'] || this.$attrs.placeholder || '请选择'
      } catch (e) {
        console.log(e)
        return this.$attrs.placeholder || '请选择'
      }
    }
  }
}
</script>

<template>
  <el-dropdown v-bind="$attrs" @command="value => _value = value" ref="dropdown">
    <div :class="{ [$style.active]: _value, [$style.context]: true }">
      <span>{{ label }}</span>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
            v-for="it in options"
            :disabled="it.disabled || false"
            :icon="it.icon"
            :key="it[$attrs.valueKey || 'id']"
            :command="it[$attrs.valueKey || 'id']">
          <div v-html="it[$attrs.labelKey || 'name']"/>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style module lang="scss">
.active { color: #128bed }
.context { display: inline-flex; align-items: center }
</style>
