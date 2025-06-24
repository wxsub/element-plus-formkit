<template>
  <div :class="[{ 'form-label-auto': isAutoAlignment }]" class="FormKit">
    <el-form
      ref="FormKitRef"
      :model="modelValue"
      :key="UNIQUE_KEY"
      v-bind="formAttrs"
      :label-position="labelPosition">
      <el-row v-bind="setRowAttrs">
        <slot name="prepend" />
        <el-col
          v-for="conf in configs"
          :key="conf.key"
          :span="conf.span || setSpanAttrs">
          <el-form-item
            :label="conf.label"
            :label-width="isAutoAlignment ? '0px' : (conf.labelWidth || `${labelWidth}px`)"
            :class="{[FormKit['auto-alignment']]: isAutoAlignment }"
            :prop="conf.key"
            :rules="conf.rules">
            <Suspense>
              <template #default>
                <component
                  v-if="conf.type"
                  :is="loader(conf.type)"
                  :ref="`module-${conf.key}`"
                  :disabled="conf['disabled']"
                  v-model="modelValue[conf.key]"
                  :options="conf.options || buckets[conf.key]"
                  v-on="conf.events || {}"
                  v-bind="conf.props"
                  @change="mutation($event, conf)"
                  :key="`module-${conf.key}-${ComponentUpdateTrigger[conf.key] || 0}`">
                </component>
              </template>
              <template #fallback>
                <div :class="FormKit.isLoading">
                  <div :class="FormKit.loader" />
                </div>
              </template>
            </Suspense>
          </el-form-item>
        </el-col>
        <slot name="append" />
      </el-row>
    </el-form>
    <slot :config="configs" name="content" />
  </div>
</template>

<script setup lang="ts">
import { modules } from '@/module-registry'
import { ElForm } from 'element-plus'
import { ElMessage } from "element-plus"
import { v4 as uuidv4 } from 'uuid'
import { isObject, isNumber, isArray, isBoolean, isFunction } from 'lodash'
import { ConfigInterface, FormKitExposed } from 'types/formkit-types'

const UNIQUE_KEY = ref(uuidv4()),
    FormKitRef = ref<InstanceType<typeof ElForm> & FormKitExposed>(),
	  Stacks: Array<object> = reactive([]),
    emits = defineEmits(["update:modelValue", "update:config", "update", "enter"]);

const ComponentUpdateTrigger = reactive<Record<string, number>>({})

const props = defineProps({
  modelValue: { required: true, type: Object },
  config: { type: Array<ConfigInterface>, default: () => [] },
  rules: { type: Object, default: () => {} },
  disabled: { type: Boolean, default: false },
  labelPosition: { type: String, default: 'top' }, // Form Input Alignment Rules
  labelWidth: { type: Number, default: 120 }, // Form item title width (only works when labelPosition is left, right)
  columns: { type: [Number, String], default: 1 }, // How many columns per row
  size: { type: String, default: 'default' }, // Form Size
  rows: { type: Object, default: () => null } // Form row item settings
})

onMounted(async () => {
  try {
    for (const iterator of props.config) {
      if (iterator?.request) Stacks.push(iterator)
    }
    if (Stacks.length > 0) await executeRequestStack()
  } catch (error) {
	  console.log(`[_initComponent method]: ${error}`)
  }
})

const formAttrs = computed(() => {
  const attrs = Object.create(null);
  attrs.size = props.size;
  attrs.inline = Number(props.columns) > 1;
  if (props.disabled) attrs.disabled = props.disabled;
  if (props.rules && Object.keys(props.rules).length > 0) attrs.rules = props.rules;
  return attrs
}), setRowAttrs = computed(() => {
  const { gutter } = props.rows || {}
  return { gutter: gutter || 20 }
}), isAutoAlignment = computed(() => {
  return props.columns === 'auto'
}), setSpanAttrs = computed(() => {
  const columnsValue = props.columns as number;
  return isNumber(columnsValue) ? 24 / columnsValue : null
}), configs: ComputedRef<ConfigInterface[]> = computed(() => {
  return props.config.filter((conf: ConfigInterface) => {
    if (conf?.visible === undefined) return conf
    if (isObject(conf.visible) || isArray(conf.visible)) {
      fixedPointClearValidate(conf)
      if (isObject(conf.visible) && checkConfigIsVisible(conf.visible)) return conf
      if (isArray(conf.visible)) {
        const _visible = conf.visible
        const isCheck = Array.isArray(_visible) && _visible.some((it: Object) => { return checkConfigIsVisible(it) })
        if (isCheck) return conf
      }
    } else if (isBoolean(conf.visible)) {
      if (conf.visible) return conf
    } else {
      console.warn('visible field has been set, but it is not an [array, object, Boolean]!')
      return conf
    }
  })
});

watchEffect(() => {
  props?.config.forEach(config => {
    if (config.key) {
      ComponentUpdateTrigger[config.key] = ComponentUpdateTrigger[config.key] === undefined ? 0 : ComponentUpdateTrigger[config.key] + 1
      fixedPointClearValidate(config)
    }
  })
})

const buckets: any = reactive({})

function loader(type: string) {
  try {
    const module = modules.getModule(type);
    if (module) {
      return module;
    } else {
      return defineAsyncComponent(async () => {
        return {
          template: `<p>Unable to find module: ${String(type)}</p>`
        };
      });
    }
  } catch (e) {
    return defineAsyncComponent(async () => {
      return {
        template: `<h5>${String(type)} load faild!</h5><p>reson: ${e}</p>`
      }
    })
  }
}
function mutation(event: any, config: ConfigInterface) {
  emits('update', { event, config })
  fixedPointClearValidate(config)
}
function fixedPointClearValidate(config: ConfigInterface) {
  if (Object.hasOwnProperty.call(config, 'key') && Object.hasOwnProperty.call(config, 'rules')) {
    FormKitRef.value?.clearValidate([config.key])
  }
}
function checkConfigIsVisible({ value, key }: any) {
  if (key && value === undefined) {
    if (props.modelValue[key]) return true
  } else if (value === undefined && key === undefined) {
    console.warn('Key and value field not detected, U can like this: { value, key } or { key }')
  } else {
    if (props.modelValue[key] === value) return true
  }
  return false
}
async function executeRequestStack() {
  const runner: IterableIterator<any> = Stacks[Symbol.iterator]()
  for (const iterator of runner) {
	  try {
      const { request, key, handle } = iterator,
        response = Object.prototype.toString.call(request) === '[object Function]' ? await request() : await request;
      if (isFunction(handle)) {
        buckets[key] = handle(response)
      } else {
        const { data = [], code } = response || {}
        if (code === 200) buckets[key] = data
      }
    } catch (e) {
      console.log(`FormKit executeRequestStack failed: ${e}`)
	  }
  }
}
function validate(openTips: boolean = false) {
  return new Promise(async (resolve, reject) => {
    try {
	    if (FormKitRef.value) {
        await FormKitRef.value?.validate((valid: boolean) => {
          if (valid) {
            resolve(props.modelValue)
          } else throw '您需要将标星号的栏目填写完整后重新尝试'
        })
      } else {
		    console.warn("组件加载未完成")
      }
    } catch (e: any) {
      if (openTips) ElMessage.error(e)
      reject(e)
    }
  })
}

defineExpose<FormKitExposed>({
  validate,
  clearValidate: () => FormKitRef.value?.clearValidate()
})
</script>

<style module="FormKit" lang="scss">
.form-kit-row { flex-wrap: wrap }
.item-hint { margin: 0; color: #888888; font-weight: 300; font-size: 12px; line-height: 24px }
.formKit-list-item { display: inline-block; width: 100% }
.auto-alignment { margin-bottom: 0 }
.isLoading {
  display: inline-flex;
  justify-content: center;
  padding: 0 4px;
  .loader {
    width: 30px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 8px solid #514b82;
    animation:
      l20-1 0.8s infinite linear alternate,
      l20-2 1.6s infinite linear;
  }
  @keyframes l20-1{
    0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
    12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
    25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
    50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
    62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
    75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
    100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
  }
  @keyframes l20-2{ 
    0%    {transform:scaleY(1)  rotate(0deg)}
    49.99%{transform:scaleY(1)  rotate(135deg)}
    50%   {transform:scaleY(-1) rotate(0deg)}
    100%  {transform:scaleY(-1) rotate(-135deg)}
  }
}
</style>

<style lang="scss">
.FormKit {
  :deep(.el-form-item) { margin: 0; width: 100% }
  :deep(.el-form--label-top .el-form-item__label) { padding: 0 }
  :deep(.el-form-item__error) { position: relative }
  :deep(.el-form-item--default) { margin-bottom: 0 }
}
.form-kit-auto :deep(.el-form-item__content) { display: inline-block }
</style>
