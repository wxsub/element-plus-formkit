<script setup lang="ts">
import { getConfigure } from '@/config'
import { ElPopover, ElEmpty, ElCascaderPanel } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { TreeOption } from 'types/formkit-types'

const isZhCN = getConfigure('lang')?.name === 'zh-cn'

const props = defineProps({
  modelValue: { default: null },
  labelKey: { type: String, default: 'name' },
  valueKey: { type: String, default: 'id' },
  loading: { type: Boolean, default: false },
  options: { type: Array as () => TreeOption[], default: () => [] }
})

const emit = defineEmits(['update:modelValue', 'change']), attrs = useAttrs();

const cascaderPanelAttrs = computed(() => {
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
  try {
    if (Array.isArray(props.options) && props.options.length === 0) return useAttrs().placeholder || (isZhCN ? '请选择' : 'Please select')
    return getLabelById() || useAttrs().placeholder || (isZhCN ? '请选择' : 'Please select')
  } catch (error) {
    console.warn(error)
    return useAttrs().placeholder || (isZhCN ? '请选择' : 'Please select')
  }
})

const getLabelById = (): string => {
  const { options = [], valueKey = 'id', labelKey = 'name' } = props,
    targetValue: string | number | (string | number)[] = _value.value,
    values: (string | number)[] = Array.isArray(targetValue) ? targetValue.flat(Infinity) : [targetValue];

  const flatOptions = (list: TreeOption[]): TreeOption[] => {
    return list.reduce((prev: TreeOption[], cur: TreeOption) => {
      prev.push(cur);
      if (Array.isArray(cur.children) && cur.children.length) {
        prev.push(...flatOptions(cur.children));
      }
      return prev
    }, [])
  }

  const matchLabels = flatOptions(options)
    .filter(opt => values.includes(opt[valueKey] as string | number))
    .map(opt => opt[labelKey] as string);

  return matchLabels.length 
    ? `${matchLabels.join(' | ')}${matchLabels.length > 5 ? ` +${matchLabels.length}` : ''}` 
    : '';
}
</script>

<template>
  <el-popover trigger="click" :disabled="loading" v-bind="$attrs" :popper-style="{ padding: 0 }" width="auto">
    <div>
      <el-empty :image-size="60" v-if="options.length === 0"></el-empty>
      <el-cascader-panel :options="options" :props="cascaderPanelAttrs" v-model="_value" v-else />
    </div>
    <template #reference>
      <span :class="{ 'module-popover-active': _value }" class="module-popover-context">
        <span v-if="loading" class="module-popover-loading">
          {{ isZhCN ? '正在加载' : 'Loading...' }} <i class="el-icon-loading" />
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
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  gap: 5px;
}

.module-popover-active {
  color: var(--el-color-primary);
}

.module-popover-loading {
  color: #ccc;
  user-select: none
}
</style>
