<script>
export default {
  name: "FormKitPopover",
  model: { prop: 'value', event: 'change' },
  props: {
    value: { required: true },
    loading: { type: [Boolean, undefined], default: false },
    options: { type: [Array, undefined], default: () => [] }
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
        const value = () => {
          const value = this._value
          if (Array.isArray(value) && value.length >= 1) return Array.isArray(value[0]) ? `${value[0].join('/')} +${this._value.length}` : value[0]
        }
        return value() || this.$attrs.placeholder || '请选择'
      } catch (e) {
        console.log(e)
        return this.$attrs.placeholder || '请选择'
      }
    }
  }
}
</script>

<template>
  <el-popover
      trigger="click"
      :disabled="loading"
      v-bind="$attrs.popover">
    <div>
      <el-empty :image-size="60" v-if="options.length === 0"></el-empty>
      <el-cascader-panel :options="options" v-bind="$attrs" v-model="_value" v-else />
    </div>
    <span :class="{ [$style.active]: _value }" slot="reference" class="cursor-pointer">
      <span v-if="loading" :class="$style.loading">
        正在加载 <i class="el-icon-loading" />
      </span>
      <template v-else>
        <span class="ellipsis">{{ label }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </template>
    </span>
  </el-popover>
</template>

<style module lang="scss">
.active { color: #128bed }
.loading { color: #ccc; user-select: none }
</style>
