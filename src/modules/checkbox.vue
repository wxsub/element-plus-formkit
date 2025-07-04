<template>
  <div class="formKit-module-checkbox">
    <el-checkbox v-if="isShowAllCheck" :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange">{{ slelectAllText }}</el-checkbox>
    <el-checkbox-group v-if="options.length > 0" v-model="FormData">
      <el-checkbox
        v-for="(it, idx) in options"
        :value="it[computedAttrs.valueKey || 'id']"
        :key="idx"
        :style="$attrs.styles">
        {{ it[computedAttrs.labelKey || 'name'] }}
      </el-checkbox>
    </el-checkbox-group>
    <p v-else>No available options found</p>
  </div>
</template>

<script setup lang="ts">
import { ElCheckbox, ElCheckboxGroup, type CheckboxValueType, useGlobalConfig } from 'element-plus'
import { computed, ref, useAttrs, watchEffect } from 'vue'

type ATTRS_TYPE = { valueKey: string; labelKey: string; }

interface OptionItem { [key: string]: any }

type CheckboxGroupValueType = Array<string | number>

const props = defineProps({
  modelValue: { type: Array as () => CheckboxGroupValueType, default: () => [] },
  showAllCheck: { type: Boolean as () => boolean, default: false },
  options: { type: Array<any>, default: () => [] }
})

const attrs = useAttrs() as ATTRS_TYPE

let checkAll = ref(false),
  FormData = computed({
    get: () => {
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
  if (Array.isArray(FormData.value) && FormData.value.length > 0) FormData.value.forEach(it => {
    const __item = props.options.find(e => (e as OptionItem)[valueKey] === it)
    if (__item?.[labelKey]) label.push((__item as Record<string, any>)[labelKey])
  })
  return label
}), slelectAllText = computed(() => {
  const globalConfig = useGlobalConfig()
  return globalConfig.value.locale?.name === 'en' ? 'Select All' : '全选'
}), computedAttrs = computed<ATTRS_TYPE>(() => attrs);

function checkAllChange(val: CheckboxValueType) {
  FormData.value = val ? [...props.options].map(it => it[attrs.valueKey || 'id']) : []
  isIndeterminate.value = false
}

function checkIndeterminate(value?: any) {
  const COUNTS = Array.isArray(value) ? value.length : 0
  checkAll.value = COUNTS === props.options.length
  isIndeterminate.value = COUNTS > 0 && COUNTS < props.options.length
}

watchEffect(() => checkIndeterminate(props.modelValue))
</script>

<style lang="scss">
.formKit-module-checkbox {
  .el-checkbox-group, .el-checkbox { height: 24px; line-height: 24px }
}
</style>  