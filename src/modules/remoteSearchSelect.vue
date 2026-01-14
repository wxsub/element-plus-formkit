<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'

const props = defineProps({
  labelKey: { type: String, default: 'name' },
  valueKey: { type: String, default: 'id' },
  initialValue: { default: null },
  placeholder: { type: String, default: '请输入' },
  modelValue: { type: [String, Number, Array] },
  onChoose: { type: [Function, null], default: null },
  handler: { type: [Function, null], default: null },
  requester: { type: [Function, null], default: null }
})

const emit = defineEmits(['update:modelValue']),
  options = ref<any>([]),
  loading = ref<boolean>(false);

const dataset: any = computed({
    get: () => {
      return props.modelValue || null
    },
    set: (value) => {
      emit('update:modelValue', value)
    }
})

const searchRemoteMethod = async (query: string) => {
  if (query && props.requester) {
    loading.value = true
    const response = await props.requester(query)
    loading.value = false
    options.value = props.handler ? props.handler(response) : (Array.isArray(response) ? response : [])
  } else {
    options.value = []
  }
}

const onChange = (value: any) => {
  try {
    if (props.onChoose) {
      const selectedOption = options.value.find((option: any) => option[props.valueKey] === value)
      if (selectedOption) {
        props.onChoose(selectedOption)
      }
    }
  } catch (error) {
    console.warn('remoteSearchSelect module onChoose error:', error)
  }
}

watch(() => props.initialValue, (value) => {
  if (value) searchRemoteMethod(value)
}, { immediate: true })
</script>

<template>
  <el-select
    v-model="dataset"
    filterable
    remote
    reserve-keyword
    :placeholder="placeholder"
    @change="onChange"
    :remote-method="searchRemoteMethod"
    :loading="loading"
    v-bind="$attrs">
    <el-option
      v-for="(it, idx) in options"
      :key="idx"
      :label="it[labelKey]"
      :value="it[valueKey]"
    />
    <template
      v-for="name in Object.keys($slots)"
      #[name]="slotProps"
      :key="`slot-${name}`">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </el-select>
</template>
