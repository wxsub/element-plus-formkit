<template><div><h2 id="基础组件使用" tabindex="-1"><a class="header-anchor" href="#基础组件使用"><span>基础组件使用</span></a></h2>
<p>Element-Plus-Formkit基础组件包含: {{ Array.from(new Set(FormKitConfig.map((it) =&gt; (it.type)))).join(&quot; 、 &quot;) }}</p>
<div>
    <FormKit v-model="dataset" :config="FormKitConfig" ref="dataSetFormRef" />
    <el-button color="#626aef" @click="submit">表单校验 form validation</el-button>
</div>
<CodeTabs id="7" :data='[{"id":"Template"},{"id":"TypeScript"}]'>
<template #title0="{ value, isActive }">Template</template>
<template #title1="{ value, isActive }">TypeScript</template>
<template #tab0="{ value, isActive }">
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FormKit</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataset<span class="token punctuation">"</span></span> <span class="token attr-name">:config</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>FormKitConfig<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code><span class="line"><span class="token operator">&lt;</span>script setup<span class="token operator">></span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> dataset <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> FormKitConfig <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            type<span class="token operator">:</span> <span class="token string">'input'</span><span class="token punctuation">,</span></span>
<span class="line">            label<span class="token operator">:</span> <span class="token string">'姓名 (Name)'</span><span class="token punctuation">,</span></span>
<span class="line">            key<span class="token operator">:</span> <span class="token string">'password'</span><span class="token punctuation">,</span></span>
<span class="line">            props<span class="token operator">:</span> <span class="token punctuation">{</span> placeholder<span class="token operator">:</span> <span class="token string">'请输入姓名'</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            type<span class="token operator">:</span> <span class="token string">'select'</span><span class="token punctuation">,</span></span>
<span class="line">            label<span class="token operator">:</span> <span class="token string">'性别 (Sex)'</span><span class="token punctuation">,</span></span>
<span class="line">            key<span class="token operator">:</span> <span class="token string">'sex'</span><span class="token punctuation">,</span></span>
<span class="line">            props<span class="token operator">:</span> <span class="token punctuation">{</span> placeholder<span class="token operator">:</span> <span class="token string">'请选择性别'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            options<span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'男 man'</span><span class="token punctuation">,</span> id<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'女 woman'</span><span class="token punctuation">,</span> id<span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">]</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            type<span class="token operator">:</span> <span class="token string">'datePicker'</span><span class="token punctuation">,</span></span>
<span class="line">            label<span class="token operator">:</span> <span class="token string">'出生日期 (Birthday)'</span><span class="token punctuation">,</span></span>
<span class="line">            key<span class="token operator">:</span> <span class="token string">'birthday'</span><span class="token punctuation">,</span></span>
<span class="line">            props<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                placeholder<span class="token operator">:</span> <span class="token string">'请选择出生日期'</span><span class="token punctuation">,</span></span>
<span class="line">                valueFormat<span class="token operator">:</span> <span class="token string">"YYYY-MM-DD"</span><span class="token punctuation">,</span></span>
<span class="line">                type<span class="token operator">:</span> <span class="token string">"date"</span><span class="token punctuation">,</span></span>
<span class="line">                style<span class="token operator">:</span> <span class="token punctuation">{</span> width<span class="token operator">:</span> <span class="token string">'100%'</span> <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            type<span class="token operator">:</span> <span class="token string">'datePicker'</span><span class="token punctuation">,</span></span>
<span class="line">            label<span class="token operator">:</span> <span class="token string">'身份证有效期 (I.D. validity period)'</span><span class="token punctuation">,</span></span>
<span class="line">            key<span class="token operator">:</span> <span class="token string">'idDate'</span><span class="token punctuation">,</span></span>
<span class="line">            props<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                placeholder<span class="token operator">:</span> <span class="token string">'请选择身份证有效期'</span><span class="token punctuation">,</span></span>
<span class="line">                valueFormat<span class="token operator">:</span> <span class="token string">"YYYY-MM-DD"</span><span class="token punctuation">,</span></span>
<span class="line">                type<span class="token operator">:</span> <span class="token string">"daterange"</span><span class="token punctuation">,</span></span>
<span class="line">                startPlaceholder<span class="token operator">:</span> <span class="token string">'开始时间 Start Time'</span><span class="token punctuation">,</span></span>
<span class="line">                endPlaceholder<span class="token operator">:</span> <span class="token string">'结束时间 End Time'</span><span class="token punctuation">,</span></span>
<span class="line">                style<span class="token operator">:</span> <span class="token punctuation">{</span> width<span class="token operator">:</span> <span class="token string">'100%'</span> <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            type<span class="token operator">:</span> <span class="token string">'inputNumber'</span><span class="token punctuation">,</span></span>
<span class="line">            label<span class="token operator">:</span> <span class="token string">'输入数字 (inputNumber)'</span><span class="token punctuation">,</span></span>
<span class="line">            rules<span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                <span class="token punctuation">{</span> required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> message<span class="token operator">:</span> <span class="token string">'输入数字不能为空'</span> <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">            key<span class="token operator">:</span> <span class="token string">'inputNumber'</span><span class="token punctuation">,</span></span>
<span class="line">            props<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">                style<span class="token operator">:</span> <span class="token punctuation">{</span> width<span class="token operator">:</span> <span class="token string">'100%'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">                placeholder<span class="token operator">:</span> <span class="token string">'请输入数字'</span><span class="token punctuation">,</span></span>
<span class="line">                min<span class="token operator">:</span> <span class="token number">0</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            type<span class="token operator">:</span> <span class="token string">'rate'</span><span class="token punctuation">,</span></span>
<span class="line">            label<span class="token operator">:</span> <span class="token string">'等级 (Rate)'</span><span class="token punctuation">,</span></span>
<span class="line">            key<span class="token operator">:</span> <span class="token string">'sex'</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            type<span class="token operator">:</span> <span class="token string">'radio'</span><span class="token punctuation">,</span></span>
<span class="line">            label<span class="token operator">:</span> <span class="token string">'是否显示隐藏项 (Show hidden items)'</span><span class="token punctuation">,</span></span>
<span class="line">            key<span class="token operator">:</span> <span class="token string">'show'</span><span class="token punctuation">,</span></span>
<span class="line">            options<span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">                <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'是 Yes'</span><span class="token punctuation">,</span> id<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">                <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'否 No'</span><span class="token punctuation">,</span> id<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">]</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            type<span class="token operator">:</span> <span class="token string">'input'</span><span class="token punctuation">,</span></span>
<span class="line">            label<span class="token operator">:</span> <span class="token string">'隐藏项 (hidden item)'</span><span class="token punctuation">,</span></span>
<span class="line">            key<span class="token operator">:</span> <span class="token string">'password'</span><span class="token punctuation">,</span></span>
<span class="line">            visible<span class="token operator">:</span> <span class="token punctuation">{</span> key<span class="token operator">:</span> <span class="token string">'show'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">            props<span class="token operator">:</span> <span class="token punctuation">{</span> placeholder<span class="token operator">:</span> <span class="token string">'请输入隐藏项'</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>visible属性支持：Object、Array、Boolean</p>
</div>
<h2 id="高级组件使用" tabindex="-1"><a class="header-anchor" href="#高级组件使用"><span>高级组件使用</span></a></h2>
<h2 id="文件上传" tabindex="-1"><a class="header-anchor" href="#文件上传"><span>文件上传</span></a></h2>
</div></template>


<script setup lang="ts">
import type { Instance } from 'element-plus-formkit'
import { ref, computed } from 'vue';

const dataset = ref({}),
    dataSetFormRef = ref<Instance>();

async function submit() {
    await dataSetFormRef.value?.validate()
}

const FormKitConfig = computed(() => {
    return [
        {
            type: 'input',
            label: '姓名 (Name)',
            key: 'password',
            props: { placeholder: '请输入姓名' }
        },
        {
            type: 'select',
            label: '性别 (Sex)',
            key: 'sex',
            props: { placeholder: '请选择性别' },
            options: [
                { name: '男 man', id: 1 },
                { name: '女 woman', id: 2 }
            ]
        },
        {
            type: 'datePicker',
            label: '出生日期 (Birthday)',
            key: 'birthday',
            props: {
                placeholder: '请选择出生日期',
                valueFormat: "YYYY-MM-DD",
                type: "date",
                style: { width: '100%' }
            }
        },
        {
            type: 'datePicker',
            label: '身份证有效期 (I.D. validity period)',
            key: 'idDate',
            props: {
                placeholder: '请选择身份证有效期',
                valueFormat: "YYYY-MM-DD",
                type: "daterange",
                startPlaceholder: '开始时间 Start Time',
                endPlaceholder: '结束时间 End Time',
                style: { width: '100%' }
            }
        },
        {
            type: 'inputNumber',
            label: '输入数字 (inputNumber)',
            rules: [
                { required: true, message: '输入数字不能为空' }
            ],
            key: 'inputNumber',
            props: {
                style: { width: '100%' },
                placeholder: '请输入数字',
                min: 0
            }
        },
        {
            type: 'rate',
            label: '等级 (Rate)',
            key: 'sex'
        },
        {
            type: 'radio',
            label: '是否显示隐藏项 (Show hidden items)',
            key: 'show',
            options: [
                { name: '是 Yes', id: true },
                { name: '否 No', id: false }
            ]
        },
        {
            type: 'input',
            label: '隐藏项 (hidden item)',
            key: 'password',
            visible: { key: 'show' },
            props: { placeholder: '请输入隐藏项' }
        }
    ]
})
</script>