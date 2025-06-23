<script setup lang="ts">
import { getConfigure } from '@/config'

import type { CascaderProps } from 'element-plus'
const props = defineProps({
  labelKey: { type: String, default: 'name' },
  valueKey: { type: String, default: 'id' },
  level: { type: Number, default: 1 },
  network: { type: Function, default: null },
  cascaderProps: { type: Object, default: () => {} },
  modelValue: { type: [String, Number, Array] }
})

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

const fetchNetWork = () => {
  if (getConfigure('addressNetWork')) {
    if (props.network) console.warn("You have set up addressNetWork configuration information, remove the unnecessary props.network parameter")
    return getConfigure('addressNetWork')
  } else if (props.network) {
    return props.network
  } else {
    console.error("The parameters for the necessary network requests are missing using address, please consult the documentation for configuration.")
    return null
  }
}

// fetch address dataset, U need redesign fetchAPI and data structure
const fetchAddressData = (pid: any, nodeLevel = 1) => {
  return new Promise(async (resolve, reject) => {
    try {
      const network = fetchNetWork();
      if (network) {
        const response = typeof network === 'function' ? await network(pid, nodeLevel) : null,
          nodes: any = [];
        if (Array.isArray(response) && response.length > 0) {
          response.map((item) => {
            const area = {
              value: item[props.valueKey],
              label: item[props.labelKey],
              leaf: nodeLevel >= props.level
            }
            nodes.push(area)
          })
        }
        resolve(nodes)
      } else {
        return reject(new Error('Network function not available'));
      }
    } catch (e) {
      reject(e)
    }
  })
}
</script>

<template>
  <el-cascader
    :props="CascaderProp"
    v-model="dataset"
    :key="level"
    v-bind="$attrs" />
</template>
