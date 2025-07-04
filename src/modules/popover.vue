<script setup lang="ts">
import { ElPopover, ElEmpty, ElCascaderPanel } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: { default: null },
  labelKey: { type: String, default: 'name' },
  valueKey: { type: String, default: 'id' },
  loading: { type: Boolean, default: false },
  options: { type: Array<any>, default: () => [] }
})

const emit = defineEmits(['update:modelValue']), attrs = useAttrs();

const popoverAttrs = computed(() => {
  return attrs && typeof attrs.popover === 'object' ? attrs.popover : {};
}), cascaderPanelAttrs = computed(() => {
  return Object.assign(attrs.props as Record<string, any> || {}, {
    label: props.labelKey,
    value: props.valueKey
  })
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
  <el-popover trigger="click" :disabled="loading" v-bind="popoverAttrs" :popper-style="{ padding: 0 }" width="auto">
    <div>
      <el-empty :image-size="60" v-if="options.length === 0"></el-empty>
      <el-cascader-panel :options="options" :props="cascaderPanelAttrs" v-model="_value" v-else />
    </div>
    <template #reference>
      <span :class="{ 'module-popover-active': _value }" class="module-popover-context">
        <span v-if="loading" class="module-popover-loading">
          正在加载 <i class="el-icon-loading" />
        </span>
        <template v-else>
          <span class="ellipsis">{{ label }}</span>
          <el-icon><ArrowDown /></el-icon>
        </template>
      </span>
    </template>
  </el-popover>
</template>

<style lang="scss">
.module-popover-context {
  cursor: pointer;
}

.module-popover-active {
  color: #128bed
}

.module-popover-loading {
  color: #ccc;
  user-select: none
}
</style>
