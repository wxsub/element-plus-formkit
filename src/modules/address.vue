<script setup lang="ts">
import { ElCascader } from 'element-plus'
import type { CascaderProps } from 'element-plus'
import type { PropType } from 'vue'

interface CascaderNode {
  value: string | number;
  label: string;
  leaf: boolean;
}

interface RegionItem {
  [key: string]: any
  value?: string | number
  label?: string
  leaf?: boolean
}

type AddressFetchMethod = (pid: string | number, nodeLevel?: number) => Promise<RegionItem[]>

const props = defineProps({
  labelKey: { type: String, default: 'name' },
  valueKey: { type: String, default: 'id' },
  level: { type: Number, default: 1 },
  cascaderProps: { type: Object as PropType<CascaderProps>, default: () => {} },
  modelValue: { type: [String, Number, Array] },
  requester: { type: Function as PropType<AddressFetchMethod> }
})

const attrs = useAttrs()

const emit = defineEmits(['update:modelValue']),
  dataset: any = computed({
    get: () => {
      return props.modelValue || (props.level > 0 ? [] : null)
    },
    set: (value) => {
      emit('update:modelValue', value)
    }
  });

const CascaderProp: CascaderProps = {
  lazy: true,
  lazyLoad(node, resolve) {
    const { level } = node,
      type = level == 0 ? -1 : node.value,
      nodes:any = [];
    fetchAddressData(type, level).then(response => {
      const rxd = nodes.concat(response)
      resolve(rxd)
    }).catch(_ => {
      resolve(nodes)
    })
  },
  ...props.cascaderProps
}

const fetchAddressData = (pid: any, nodeLevel = 1) => {
  return new Promise<CascaderNode[]>(async (resolve, reject) => {
    try {
      if (props.requester) {
        const response = await props.requester(pid, nodeLevel)

        const processedResponse = typeof attrs.handler === 'function' 
          ? attrs.handler(response) 
          : response

        if (Array.isArray(processedResponse) && processedResponse.length > 0) {
          const nodes =  processedResponse.map(item => ({
            value: item[props.valueKey] ?? item.value,
            label: item[props.labelKey] ?? item.label,
            leaf: item.leaf ?? (nodeLevel >= props.level)
          })) as CascaderNode[]
          resolve(nodes)
        } else {
          resolve([])
          console.warn('No data found for the given region.')
        }
      } else {
        resolve([])
        console.warn('requester is not defined. Please provide a method to fetch address data in the props.')
      }
    } catch (e) {
      reject(e)
      console.warn(e)
    }
  })
}
</script>

<template>
  <el-cascader
    :props="CascaderProp"
    v-model="dataset"
    :key="level"
    v-bind="$attrs">
    <template
      v-for="name in Object.keys($slots)"
      #[name]="slotProps"
      :key="`slot-${name}`">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </el-cascader>
</template>
