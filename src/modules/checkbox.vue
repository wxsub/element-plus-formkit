<template>
  <div class="formKit-checkbox">
    <el-checkbox v-if="isShowAllCheck" :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange">全选</el-checkbox>
    <el-checkbox-group v-if="options.length > 0" :indeterminate="isIndeterminate" v-model="FormData">
      <el-checkbox
          v-for="(it, idx) in options"
          :label="it[computedAttrs.valueKey || 'id']"
          :key="idx"
          :style="$attrs.styles">
        {{ it[computedAttrs.labelKey || 'name'] }}
      </el-checkbox>
    </el-checkbox-group>
    <p v-else>No available options found</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

type ATTRS_TYPE = {
  valueKey: string;
  labelKey: string;
}

interface OptionItem { [key: string]: any }

const props = defineProps({
  modelValue: { type: [String, Array] },
  showAllCheck: { type: Boolean as () => boolean, default: false },
  options: { type: Array<any>, default: () => [] }
})

const attrs = useAttrs() as ATTRS_TYPE

let checkAll: any = ref(false),
    FormData: any = computed({
      get: () => {
        checkIndeterminate(props.modelValue)
        return props.modelValue || []
      },
      set: (value) => {
        emit('update:modelValue', value)
        checkIndeterminate(value)
      }
    }),
    isIndeterminate = ref(true);

const emit = defineEmits(['update:modelValue'])

const isShowAllCheck = computed(() => {
  return props.options.length > 0 && props.showAllCheck
}), label = computed(() => {
  let label: any = [], { valueKey = "id", labelKey = "name" } = attrs;
  if (props.options.length === 0) return label
  if (Array.isArray(FormData) && FormData.length > 0) FormData.forEach(it => {
    const __item = props.options.find(e => (e as OptionItem)[valueKey] === it)
    if (__item?.[labelKey]) label.push((__item as Record<string, any>)[labelKey])
  })
  return label
}), computedAttrs = computed<ATTRS_TYPE>(() => attrs);

function checkAllChange(val: Array<any>) {
  FormData = val ? [...props.options].map(it => it[attrs.valueKey || 'id']) : []
  isIndeterminate.value = false
}

function checkIndeterminate(value?: any) {
  const COUNTS = Array.isArray(value) ? value.length : 0
  checkAll = COUNTS === props.options.length
  isIndeterminate.value = COUNTS > 0 && COUNTS < props.options.length
}
</script>

<style scoped lang="scss">
.formKit-checkbox {
  :deep(.el-checkbox-group, .el-checkbox) { height: 24px; line-height: 24px }
}
</style>
