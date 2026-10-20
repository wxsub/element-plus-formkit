<script setup lang="ts">
import { ElDatePicker } from 'element-plus'

// 本组件全权接管 attrs 转发（见模板），关闭自动 fallthrough，避免与显式绑定重复合并
defineOptions({ inheritAttrs: false })

const props = defineProps({
    modelValue: { default: null },
    // formkit 会对所有模块统一传入 options，datePicker 没有该属性，
    // 声明为 prop 将其消费掉，防止数组作为未知 attr 落到 DOM 上
    options: { type: Array<any>, default: () => [] }
})

const emit = defineEmits(['update:modelValue']);

const _value: any = computed({
    get: () => props.modelValue ?? null,
    set: (value) => {
        emit('update:modelValue', value)
    }
})
</script>

<template>
    <!--
      element-plus 为日期编辑器内置双类规则 .el-date-editor.el-input{ width: var(--el-date-editor-width) }（220px 起），
      优先级高于常规单类工具类，外部 class 无法覆盖宽度；内联 style 优先级最高，
      这里默认内联 100% 与其他表单模块对齐，用户传入的 style 置于其后仍可覆盖默认值。
      注意：$attrs 不是响应式对象（Vue 官方语义），合并逻辑必须写在模板表达式里随每次渲染重新求值，
      不能提取为 computed，否则父组件动态修改 style/class/disabled 等属性时视图不会更新
    -->
    <el-date-picker
        v-model="_value"
        v-bind="{ ...$attrs, style: [{ width: '100%' }, $attrs.style] }">
        <template
            v-for="name in Object.keys($slots)"
            #[name]="slotProps"
            :key="`slot-${name}`">
            <slot :name="name" v-bind="slotProps" />
        </template>
    </el-date-picker>
</template>
