<template>
  <div :class="[{ 'form-label-auto': isAutoAlignment }]" class="element-plus-formkit">
    <el-config-provider :locale="getConfigure('lang')" :size="size">
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
              :class="{'auto-alignment': isAutoAlignment }"
              :prop="conf.key"
              :rules="conf.rules">
              <Suspense v-if="conf.type">
                <template #default>
                  <component
                    :is="loader(conf.type)"
                    :ref="`module-${conf.key}`"
                    :disabled="conf['disabled']"
                    v-model="modelValue[conf.key]"
                    :options="conf.options || buckets[conf.key]"
                    v-on="conf.events || {}"
                    v-bind="conf.props"
                    @change="mutation($event, conf)"
                    :key="`module-${conf.key}-${ComponentUpdateTrigger[conf.key] || 0}`">
                    <template 
                      v-for="slotSuffix in getComponentSlotSuffixes(conf.key)" 
                      #[slotSuffix]="slotProps"
                      :key="`${conf.key}-${slotSuffix}`">
                      <slot :name="`${conf.key}-${slotSuffix}`" v-bind="slotProps" />
                    </template>
                  </component>
                </template>
                <template #fallback>
                  <div class="formkit-module-loading"></div>
                </template>
              </Suspense>
              <slot :name="conf.key" :row="conf" :value="modelValue[conf.key]" :size="size" />
              <p v-if="conf.hint" class="item-hint w-full" v-html="conf.hint"/>
            </el-form-item>
          </el-col>
          <slot name="append" />
        </el-row>
      </el-form>
      <slot :config="configs" name="content" />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { modules } from '@/module-registry'
import { getConfigure } from '@/config'
import { ElForm, ElRow, ElCol, ElFormItem, ElConfigProvider, ElMessage } from 'element-plus'
import { isObject, isNumber, isArray, isBoolean, isFunction, uuidv4 } from '@/utils/util'
import { ConfigInterface, FormKitExposed, ValidSize, FormKitSlots } from 'types/formkit-types'

const UNIQUE_KEY = ref(uuidv4()),
    slots = useSlots(),
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
  rows: { type: Object, default: () => null }, // Form row item settings
  size: {
    type: String as () => ValidSize,
    default: 'default',
    validator: (val: string): val is ValidSize => ['', 'small', 'default', 'large'].includes(val)
  }
})

onMounted(async () => {
  try {
    for (const iterator of props.config) {
      if (iterator?.type && isStandaloneRequester(iterator.type)) continue;
      if (iterator?.requester) Stacks.push(iterator)
    }
    if (Stacks.length > 0) await executeRequestStack()
  } catch (error) {
	  console.log(`[_initComponent method]: ${error}`)
  }
})

const formAttrs = computed(() => {
  const attrs = Object.create(null);
  attrs.inline = Number(props.columns) > 1;
  if (props.disabled) attrs.disabled = props.disabled;
  if (props.rules && Object.keys(props.rules).length > 0) attrs.rules = props.rules;
  return attrs
}), setRowAttrs = computed(() => {
  const { columnGap } = props.rows || {}
  return { gutter: columnGap || 10 }
}), isAutoAlignment = computed(() => {
  return props.columns === 'auto'
}), setSpanAttrs = computed(() => {
  const columnsValue = props.columns as number;
  return isNumber(columnsValue) ? 24 / columnsValue : -1;
}), configs: ComputedRef<ConfigInterface[]> = computed(() => {
  return props.config.filter((conf: ConfigInterface) => {
    const hasVisibleProp = Object.prototype.hasOwnProperty.call(conf, 'visible');
    if (!hasVisibleProp) return true

    const { visible } = conf
    if (visible === undefined) return false
    
    if (isBoolean(visible)) return visible

    if (isObject(visible) || isArray(visible)) {
      if (isObject(visible) && checkConfigIsVisible(visible)) return true
      if (isArray(visible)) {
        return (visible as any[]).some((it: Object) => checkConfigIsVisible(it))
      }
    } else {
      console.warn('visible field has been set, but it is not an [array, object, Boolean]!')
      return true
    }
    return false
  }).map((conf: ConfigInterface) => {
    if (conf.type && isStandaloneRequester(conf.type)) {
      const keys = ['requester', 'handler'] as const
      const shouldClone = keys.some(key => conf[key] && !(key in (conf.props || {})))
      
      if (shouldClone) {
        const newConf = { ...conf, props: { ...(conf.props || {}) } }
        keys.forEach(key => {
          if (newConf[key] && !(key in newConf.props)) {
            (newConf.props as any)[key] = newConf[key]
            delete newConf[key]
          }
        })
        return newConf
      }
    }
    return conf
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
function isStandaloneRequester(type: string) {
  return type === 'address' || type === 'remoteSearchSelect' || type === 'upload'
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
  if (!props.modelValue) return false

  if (key !== undefined && value === undefined) {
    return !!props.modelValue[key]
  } else if (key !== undefined && value !== undefined) {
    return props.modelValue[key] === value
  }
  
  return false
}

const getComponentSlotSuffixes = (key: string): string[] => {
  try {
    if (!key || !slots || typeof key !== 'string') return [];
  
    const slotMap = slots as unknown as FormKitSlots
    if (typeof slotMap !== 'object' || slotMap === null) return [];
    
    const allSlotNames = Object.keys(slotMap),
      slotNamePrefix = `${key}-`;

    if (slotNamePrefix.length <= 1) return [];

    return allSlotNames
      .filter((slotName): slotName is string => {
        return typeof slotName === 'string' && slotName.startsWith(slotNamePrefix);
      })
      .map(slotName => slotName.slice(slotNamePrefix.length));
  } catch (error) {
    console.warn('[FormKit] Failed to retrieve component slot suffix: ', error)
    return []
  }
}

async function executeRequestStack() {
  const runner: IterableIterator<any> = Stacks[Symbol.iterator]()
  for (const iterator of runner) {
	  try {
      const { requester, key, handler } = iterator,
        response = Object.prototype.toString.call(requester) === '[object Function]' ? await requester() : await requester;
      if (isFunction(handler)) {
        buckets[key] = handler(response)
      } else {
        const { data = [] } = response || {}
        buckets[key] = data
      }
    } catch (e) {
      console.log(`FormKit executeRequestStack failed: ${e}`)
	  }
  }
}
function validate(openTips: boolean = false) {
  return new Promise(async (resolve, reject) => {
    try {
      const isZhCN = getConfigure('lang')?.name === 'zh-cn'
	    if (FormKitRef.value) {
        await FormKitRef.value?.validate((valid: boolean) => {
          if (valid) {
            resolve(props.modelValue)
          } else throw isZhCN ? '您需要将标星号的栏目填写完整后重新尝试' : 'Please fill in all required fields'
        })
      } else {
		    console.warn("Component loading is not complete!")
      }
    } catch (e: any) {
      if (openTips) ElMessage.error(e)
      reject(e)
    }
  })
}

defineExpose<FormKitExposed>({
  validate,
  clearValidate: () => FormKitRef.value?.clearValidate(),
  buckets
})
</script>

<style lang="scss">
.element-plus-formkit {
  .item-hint { margin: 0; color: #888888; font-weight: 300; font-size: 12px; line-height: 24px }
  .formKit-list-item { display: inline-block; width: 100% }
  .auto-alignment { margin-bottom: 0 }
  .form-kit-row {
    flex-wrap: wrap;
    .el-form-item__content { display: inline-block }
  }
  .formkit-module-loading {
    position: relative;
    overflow: hidden;
    background-color: #f5f5f5;
    border-radius: 4px;
    color: transparent;
    border: none;
    cursor: wait;
    pointer-events: none;
    user-select: none;
    width: 100%;
    min-width: 100px;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: skeleton-loading 1.5s infinite linear;
      z-index: 1;
    }
    @keyframes skeleton-loading {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  }

  .el-row { row-gap: v-bind("`${props.rows?.rowGap || 5}px`") }
  .el-form-item { margin: 0; width: 100% }
  .el-form--label-top .el-form-item__label { padding: 0 }
  .el-form-item--default { margin-bottom: 0 }
}
</style>

