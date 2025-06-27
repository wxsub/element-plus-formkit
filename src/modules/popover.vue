<script setup lang="ts">
import { ElPopover, ElEmpty, ElCascaderPanel } from 'element-plus'

const props = defineProps({
  modelValue: { default: null },
  loading: { type: Boolean, default: false },
  options: { type: Array<any>, default: () => [] }
})

const emit = defineEmits(['update:modelValue']);

const popoverAttrs = computed(() => {
  const attrs = useAttrs();
  return attrs && typeof attrs.popover === 'object' ? attrs.popover : {};
});

const _value: any = computed({
  get: () => {
    return props.modelValue
  },
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const label = computed(() => {
  if (Array.isArray(props.options) && props.options.length === 0) return useAttrs().placeholder || '请选择'
  const value = () => {
    const value = _value.value
    if (Array.isArray(value) && value.length >= 1) return Array.isArray(value[0]) ? `${value[0].join('/')} +${_value.value.length}` : value[0]
  }
  return value() || useAttrs().placeholder || '请选择'
})
</script>

<template>
  <el-popover trigger="click" :disabled="loading" v-bind="popoverAttrs" class="formkit-module-popover">
    <div>
      <el-empty :image-size="60" v-if="options.length === 0"></el-empty>
      <el-cascader-panel :options="options" v-bind="$attrs" v-model="_value" v-else />
    </div>
    <span :class="{ 'active': _value }" slot="reference" class="cursor-pointer">
      <span v-if="loading" class="loading">
        正在加载 <i class="el-icon-loading" />
      </span>
      <template v-else>
        <span class="ellipsis">{{ label }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </template>
    </span>
  </el-popover>
</template>

<style lang="scss">
.formkit-module-popover {
  .active {
    color: #128bed
  }

  .loading {
    color: #ccc;
    user-select: none
  }
}
</style>
