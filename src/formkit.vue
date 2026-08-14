<template>
  <div :class="$style['element-plus-formkit']">
    <el-config-provider :locale="getConfigure('lang')" :size="size">
      <el-form
        ref="FormKitRef"
        :model="modelValue"
        :key="UNIQUE_KEY"
        v-bind="formAttrs"
        :label-position="labelPosition">
        <span
          ref="labelProbeRef"
          :class="$style['label-probe']"
          aria-hidden="true"></span>
        <el-row :gutter="props.gap?.col || 10" :style="{ rowGap: `${props.gap?.row || 12}px` }">
          <slot name="prepend" />
          <el-col
            v-for="conf in configs"
            :key="conf.key"
            :span="conf.span || setSpanAttrs"
            v-bind="conf.col || {}">
            <el-form-item
              :label="conf.label"
              :label-width="resolveFormItemLabelWidth(conf)"
              :prop="conf.key"
              :rules="conf.rules">
              <Suspense v-if="conf.type">
                <template #default>
                  <component
                    :is="loader(conf.type)"
                    :ref="`module-${conf.key}`"
                    :disabled="conf.disabled"
                    v-model="modelValue[conf.key]"
                    :options="conf.options || buckets[conf.key]"
                    v-bind="{ ...conf.props, ...setEvents(conf) }"
                    @change="mutation($event, conf)"
                    :key="`module-${conf.key}`">
                    <template
                      v-for="slotSuffix in slotSuffixMap[conf.key] || []" 
                      #[slotSuffix]="slotProps"
                      :key="`${conf.key}-${slotSuffix}`">
                      <slot :name="`${conf.key}-${slotSuffix}`" v-bind="slotProps" />
                    </template>
                  </component>
                </template>
                <template #fallback>
                  <div :class="$style['formkit-module-loading']"></div>
                </template>
              </Suspense>
              <slot :name="conf.key" :row="conf" :value="modelValue[conf.key]" :size="size" />
              <p v-if="conf.hint" :class="$style['item-hint']" v-html="conf.hint"/>
            </el-form-item>
          </el-col>
          <el-col v-if="$slots.append" :style="{ flex: 'none', width: 'auto' }">
            <slot name="append" :value="modelValue" />
          </el-col>
        </el-row>
      </el-form>
      <slot :config="configs" name="content" />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { modules } from '@/module-registry'
import { getConfigure } from '@/config'
import { ElForm, ElRow, ElCol, ElFormItem, ElConfigProvider, type FormItemProp, type RowProps } from 'element-plus'
import { isObject, isNumber, isArray, isBoolean, isFunction, uuidv4, measureLabelWidth, stripHtml } from '@/utils/util'
import { ConfigInterface, FormKitExposed, ValidSize, FormKitSlots, FormItemRule } from 'types/formkit-types'
import { h } from 'vue'

const UNIQUE_KEY = ref(uuidv4()),
    slots = useSlots(),
    FormKitRef = ref<InstanceType<typeof ElForm> & FormKitExposed>(),
    emits = defineEmits(["update:modelValue", "update:config", "update", "error"]);

const props = defineProps({
  modelValue: { required: true, type: Object },
  config: { type: Array<ConfigInterface>, default: () => [] },
  rules: { type: Object, default: () => {} },
  disabled: { type: Boolean, default: false },
  labelPosition: { type: String, default: 'top' }, // Form Input Alignment Rules
  labelWidth: { // Form item title width (only works when labelPosition is left, right). 'auto' computes width by label character count
    type: [Number, String],
    default: 120,
    validator: (val: number | string) => isNumber(val) || val === 'auto'
  },
  columns: { type: [Number, String], default: 1 }, // How many columns per row
  gap: { type: Object, default: () => null }, // Form item gap settings
  size: {
    type: String as () => ValidSize,
    default: 'default',
    validator: (val: string): val is ValidSize => ['', 'small', 'default', 'large'].includes(val)
  }
})

const requesterConfigs = computed(() => {
  return Array.isArray(props?.config) ? props.config.filter(item => {
    const { requester, type } = item as ConfigInterface
    return !!requester && !isStandaloneRequester(type ?? '')
  }) : []
})

watch(requesterConfigs, async (items) => {
  if (items.length > 0) await executeRequestStack(items)
}, { deep: true, immediate: true })

const formAttrs = computed(() => {
  const attrs = Object.create(null);
  if (props.disabled) attrs.disabled = props.disabled;
  if (props.rules && Object.keys(props.rules).length > 0) attrs.rules = props.rules;
  return attrs
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
      return {
        setup() {
          return () => h('p', `Unable to find module: ${String(type)}`);
        }
      };
    }
  } catch (e: any) {
    return {
      setup() {
        return () => h('div', [
          h('h5', `${String(type)} load failed!`),
          h('p', `reason: ${e.message || String(e)}`)
        ]);
      }
    };
  }
}
function hasRequiredRule(conf: ConfigInterface): boolean {
  return isArray(conf.rules) && (conf.rules as FormItemRule[]).some(rule => rule?.required === true)
}

const labelProbeRef = ref<HTMLElement>(),
  measuredLabelWidths: Record<string, number> = reactive({});
function resolveFormItemLabelWidth(conf: ConfigInterface): string | undefined {
  if (props.labelPosition === 'top') return undefined
  // Priority: conf.labelWidth(number) > empty label(0) > conf.labelWidth('auto') > global 'auto' > global number
  if (isNumber(conf.labelWidth)) return `${conf.labelWidth}px`
  if (stripHtml(conf.label).trim().length === 0) return undefined
  if (conf.labelWidth === 'auto' || props.labelWidth === 'auto') {
    const measured = measuredLabelWidths[conf.key]
    return `${measured ?? measureLabelWidth(conf.label, hasRequiredRule(conf))}px`
  }
  return `${props.labelWidth}px`
}
function computeAutoLabelWidths() {
  const probe = labelProbeRef.value
  if (!probe || props.labelPosition === 'top') return

  const items = props.config.filter(conf =>
    conf.key &&
    stripHtml(conf.label).trim().length > 0 &&
    (conf.labelWidth === 'auto' || (!isNumber(conf.labelWidth) && props.labelWidth === 'auto'))
  )
  if (items.length === 0) {
    probe.replaceChildren()
    return
  }

  const fragment = document.createDocumentFragment(),
      createNode = (text: string) => {
        const node = document.createElement('span')
        node.className = 'el-form-item__label'
        node.textContent = text
        fragment.appendChild(node)
        return node
      },
      asteriskNode = createNode('*'),
      labelNodes = items.map(conf => createNode(stripHtml(conf.label)));

  // Phase 1: single DOM write for all measurement nodes
  probe.replaceChildren(fragment)

  // Phase 2: single layout pass — the first read forces one reflow, the rest are free
  const requiredMarkWidth = asteriskNode.offsetWidth + 4
  items.forEach((conf, index) => {
    const extra = hasRequiredRule(conf) ? requiredMarkWidth : 0
    measuredLabelWidths[conf.key] = labelNodes[index].offsetWidth + extra + 1
  })
}
watch(
  () => props.labelPosition === 'top' ? null : [props.config, props.labelWidth, props.size],
  computeAutoLabelWidths,
  { deep: true, immediate: true, flush: 'post' }
)
onMounted(() => {
  if (props.labelPosition === 'top') return
  document.fonts?.ready?.then(() => computeAutoLabelWidths())
})

function isStandaloneRequester(type: string) {
  return type === 'address' || type === 'remoteSearchSelect' || type === 'upload'
}
function mutation(event: any, config: ConfigInterface) {
  emits('update', { event, config })
  fixedPointClearValidate(config)
}
function setEvents(conf: ConfigInterface) {
  const events = conf.events || {}, result: any = {};
  for (const [key, handler] of Object.entries(events)) {
    const eventName = key.startsWith('on')
      ? key
      : `on${key.charAt(0).toUpperCase()}${key.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`
    result[eventName] = handler
  }
  return result
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

const slotSuffixMap = computed(() => {
  const cache: Record<string, string[]> = {},
    slotMap = slots as unknown as FormKitSlots;

  if (typeof slotMap !== 'object' || slotMap === null) return cache;

  const allSlotNames = Object.keys(slotMap);

  props.config.forEach(conf => {
    if (conf.key) {
      const prefix = `${conf.key}-`;
      cache[conf.key] = allSlotNames
        .filter(name => name.startsWith(prefix))
        .map(name => name.slice(prefix.length));
    }
  });
  
  return cache;
});

async function executeRequestStack(items: any[] = []) {
  if (items.length === 0) return;
  const promises = items.map(async (item) => {
    const { requester, key, handler } = item;
    try {
      const response = Object.prototype.toString.call(requester) === '[object Function]' 
        ? await requester() 
        : await requester;
      buckets[key] = isFunction(handler) ? handler(response) : (response || []);
    } catch (e: any) {
      console.error(`[FormKit] Request failed for key "${key}":`, e);
      buckets[key] = []; // Provide a fallback empty array to prevent UI crash
      emits('error', { key, error: e, requester });
    }
  });
  await Promise.allSettled(promises);
}

defineExpose<FormKitExposed>({
  validate: (...args) => FormKitRef.value!.validate(...args),
  clearValidate: (...args) => FormKitRef.value!.clearValidate(...args),
  buckets,
  validateField: async (key: string) => {
    const result = await FormKitRef.value?.validateField(key)
    return result ?? Promise.resolve(undefined)
  },
  scrollToField: (prop: FormItemProp) => FormKitRef.value?.scrollToField(prop),
  fields: FormKitRef.value?.fields || [],
  resetFields: (props?: FormItemProp | FormItemProp[] | undefined) => FormKitRef.value?.resetFields(props),
  setInitialValues: (props: Record<string, any>) => FormKitRef.value?.setInitialValues(props),
})
</script>

<style lang="scss" module>
.element-plus-formkit {
  .item-hint { width: 100%; margin: 0; color: #888888; font-weight: 300; font-size: 12px; line-height: 24px }
  .label-probe {
    position: absolute;
    visibility: hidden;
    white-space: nowrap;
    height: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .formkit-module-loading {
    background-image: linear-gradient(90deg, #f0f2f5 25%, #e6e8eb 37%, #f0f2f5 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.6s infinite ease;
    border-radius: 4px;
    color: transparent;
    border: none;
    cursor: wait;
    pointer-events: none;
    user-select: none;
    width: 100%;
    min-width: 100px;
    min-height: 30px;
  }
  @keyframes skeleton-loading {
    0% { background-position: 100% 50% }
    100% { background-position: 0 50% }
  }
  :global {
    .el-form-item { margin: 0; width: 100% }
    .el-form--label-top .el-form-item__label { padding: 0 }
    .el-form-item--default { margin-bottom: 0 }
  }
}
</style>

