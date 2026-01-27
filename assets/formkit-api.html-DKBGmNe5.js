import{f as p}from"./index-7e2823cf-BIl6KDcI.js";import{d as u,r as d,c as r,h as i,e,f as l,g as c,w as v,u as t,b as m,o as b}from"./app-CWmAcci0.js";const q=u({__name:"formkit-api.html",setup(k){const n=d({});return(g,s)=>{const o=m("RouteLink");return b(),r("div",null,[s[12]||(s[12]=i('<h1 id="组件道具-props" tabindex="-1"><a class="header-anchor" href="#组件道具-props"><span>组件道具（props）</span></a></h1><h2 id="model-value-v-model" tabindex="-1"><a class="header-anchor" href="#model-value-v-model"><span>model-value / v-model</span></a></h2><p>组件绑定数据源，类型：<code>Object</code></p><h2 id="config" tabindex="-1"><a class="header-anchor" href="#config"><span>config</span></a></h2>',4)),e("p",null,[s[9]||(s[9]=c("组件配置项，具体参数请查阅")),l(o,{to:"/config-api.html"},{default:v(()=>s[8]||(s[8]=[c("Config Api")])),_:1,__:[8]}),s[10]||(s[10]=c("。类型：")),s[11]||(s[11]=e("code",null,"Array",-1))]),s[13]||(s[13]=e("h2",{id:"disabled",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#disabled"},[e("span",null,"disabled")])],-1)),s[14]||(s[14]=e("p",null,[c("禁用整个表单。类型："),e("code",null,"Boolean")],-1)),l(t(p),{config:[{type:"input",label:"姓名",key:"password",props:{placeholder:"请输入姓名",clearable:!0}}],disabled:!0,modelValue:n.value,"onUpdate:modelValue":s[0]||(s[0]=a=>n.value=a)},null,8,["modelValue"]),s[15]||(s[15]=i(`<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>formkit</span></span>
<span class="line">    <span class="token attr-name">:config</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名&#39;, clearable: true }</span>
<span class="line">        }</span>
<span class="line">    ]<span class="token punctuation">&quot;</span></span></span>
<span class="line highlighted">    <span class="token attr-name">:disabled</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dataset<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>formkit</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="labelposition" tabindex="-1"><a class="header-anchor" href="#labelposition"><span>labelPosition</span></a></h2><p>表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性</p><blockquote><p>可选项：&#39;left&#39; | &#39;right&#39; | &#39;top&#39;</p></blockquote>`,4)),l(t(p),{config:[{type:"input",label:"姓名",key:"password",props:{placeholder:"请输入姓名",clearable:!0}}],labelPosition:"left",modelValue:n.value,"onUpdate:modelValue":s[1]||(s[1]=a=>n.value=a)},null,8,["modelValue"]),s[16]||(s[16]=e("br",null,null,-1)),l(t(p),{config:[{type:"input",label:"姓名",key:"password",props:{placeholder:"请输入姓名",clearable:!0}}],labelPosition:"right",modelValue:n.value,"onUpdate:modelValue":s[2]||(s[2]=a=>n.value=a)},null,8,["modelValue"]),s[17]||(s[17]=i(`<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>formkit</span></span>
<span class="line">    <span class="token attr-name">:config</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名&#39;, clearable: true }</span>
<span class="line">        }</span>
<span class="line">    ]<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">labelPosition</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>left<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dataset<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>formkit</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>formkit</span></span>
<span class="line">    <span class="token attr-name">:config</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名&#39;, clearable: true }</span>
<span class="line">        }</span>
<span class="line">    ]<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">labelPosition</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>right<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dataset<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>formkit</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="labelwidth" tabindex="-1"><a class="header-anchor" href="#labelwidth"><span>labelWidth</span></a></h2><p>标签的长度，例如 &#39;50px&#39;。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。</p><h2 id="columns" tabindex="-1"><a class="header-anchor" href="#columns"><span>columns</span></a></h2><p>每行允许存在的表单项。</p><blockquote><p>type: [Number, String]</p></blockquote>`,6)),l(t(p),{config:[{type:"input",label:"姓名1",key:"password",props:{placeholder:"请输入姓名1",clearable:!0}},{type:"input",label:"姓名2",key:"password",props:{placeholder:"请输入姓名2",clearable:!0}},{type:"input",label:"姓名3",key:"password",props:{placeholder:"请输入姓名3",clearable:!0}}],columns:2,modelValue:n.value,"onUpdate:modelValue":s[3]||(s[3]=a=>n.value=a)},null,8,["modelValue"]),s[18]||(s[18]=e("p",null,"columns: 3",-1)),l(t(p),{config:[{type:"input",label:"姓名1",key:"password",props:{placeholder:"请输入姓名1",clearable:!0}},{type:"input",label:"姓名2",key:"password",props:{placeholder:"请输入姓名2",clearable:!0}},{type:"input",label:"姓名3",key:"password",props:{placeholder:"请输入姓名3",clearable:!0}}],columns:3,modelValue:n.value,"onUpdate:modelValue":s[4]||(s[4]=a=>n.value=a)},null,8,["modelValue"]),s[19]||(s[19]=i(`<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>formkit</span></span>
<span class="line">    <span class="token attr-name">:config</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名1&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名1&#39;, clearable: true }</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名2&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名2&#39;, clearable: true }</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名3&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名3&#39;, clearable: true }</span>
<span class="line">        }</span>
<span class="line">    ]<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">:columns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>2<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dataset<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>formkit</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>columns: 3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>formkit</span></span>
<span class="line">    <span class="token attr-name">:config</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名1&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名1&#39;, clearable: true }</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名2&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名2&#39;, clearable: true }</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名3&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名3&#39;, clearable: true }</span>
<span class="line">        }</span>
<span class="line">    ]<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">:columns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>3<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dataset<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>formkit</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>columns 值为 auto 时，会自动计算每个表单项的宽度, 并根据宽度自动换行, 此时 label-width 会失效。</p></div>`,2)),l(t(p),{config:[{type:"input",label:"姓名1",key:"password",props:{placeholder:"请输入姓名1",clearable:!0}},{type:"input",label:"姓名2",key:"password",props:{placeholder:"请输入姓名2",clearable:!0}},{type:"input",label:"姓名3",key:"password",props:{placeholder:"请输入姓名3",clearable:!0}}],columns:"auto",modelValue:n.value,"onUpdate:modelValue":s[5]||(s[5]=a=>n.value=a)},null,8,["modelValue"]),s[20]||(s[20]=i(`<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>formkit</span></span>
<span class="line">    <span class="token attr-name">:config</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名1&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名1&#39;, clearable: true }</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名2&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名2&#39;, clearable: true }</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名3&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名3&#39;, clearable: true }</span>
<span class="line">        }</span>
<span class="line">    ]<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">columns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>auto<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dataset<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>formkit</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="size" tabindex="-1"><a class="header-anchor" href="#size"><span>size</span></a></h2><p>表单项尺寸。</p><blockquote><p>可选项：&#39;&#39; | &#39;large&#39; | &#39;default&#39; | &#39;small&#39;</p></blockquote>`,4)),l(t(p),{config:[{type:"input",label:"姓名1",key:"password",props:{placeholder:"请输入姓名1",clearable:!0}}],size:"large",modelValue:n.value,"onUpdate:modelValue":s[6]||(s[6]=a=>n.value=a)},null,8,["modelValue"]),s[21]||(s[21]=i(`<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>formkit</span></span>
<span class="line">    <span class="token attr-name">:config</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名1&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名1&#39;, clearable: true }</span>
<span class="line">        }</span>
<span class="line">    ]<span class="token punctuation">&quot;</span></span></span>
<span class="line highlighted">    <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>large<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dataset<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>formkit</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rows" tabindex="-1"><a class="header-anchor" href="#rows"><span>rows</span></a></h2><p>表格行项目设置，类型：<code>Object</code></p><h3 id="rows-rowgap" tabindex="-1"><a class="header-anchor" href="#rows-rowgap"><span>rows.rowGap</span></a></h3><p>表单项水平横向间距。类型：<code>Number</code></p><p>默认: 5</p><h3 id="rows-columngap" tabindex="-1"><a class="header-anchor" href="#rows-columngap"><span>rows.columnGap</span></a></h3><p>表单项垂直纵向间距。类型：<code>Number</code></p><p>默认: 20</p>`,9)),l(t(p),{config:[{type:"input",label:"姓名1",key:"password",props:{placeholder:"请输入姓名1",clearable:!0}},{type:"input",label:"姓名2",key:"password",props:{placeholder:"请输入姓名2",clearable:!0}},{type:"input",label:"姓名3",key:"password",props:{placeholder:"请输入姓名3",clearable:!0}}],columns:2,rows:{rowGap:50,columnGap:50},modelValue:n.value,"onUpdate:modelValue":s[7]||(s[7]=a=>n.value=a)},null,8,["modelValue"]),s[22]||(s[22]=i(`<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>formkit</span></span>
<span class="line">    <span class="token attr-name">:config</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名1&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名1&#39;, clearable: true }</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名2&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名2&#39;, clearable: true }</span>
<span class="line">        },</span>
<span class="line">        {</span>
<span class="line">            type: &#39;input&#39;,</span>
<span class="line">            label: &#39;姓名3&#39;,</span>
<span class="line">            key: &#39;password&#39;,</span>
<span class="line">            props: { placeholder: &#39;请输入姓名3&#39;, clearable: true }</span>
<span class="line">        }</span>
<span class="line">    ]<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">:columns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>2<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">:rows</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{</span>
<span class="line">        rowGap: 50,</span>
<span class="line">        columnGap: 50</span>
<span class="line">    }<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dataset<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>formkit</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1))])}}}),y=JSON.parse(`{"path":"/formkit-api.html","title":"组件道具（props）","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"model-value / v-model","slug":"model-value-v-model","link":"#model-value-v-model","children":[]},{"level":2,"title":"config","slug":"config","link":"#config","children":[]},{"level":2,"title":"disabled","slug":"disabled","link":"#disabled","children":[]},{"level":2,"title":"labelPosition","slug":"labelposition","link":"#labelposition","children":[]},{"level":2,"title":"labelWidth","slug":"labelwidth","link":"#labelwidth","children":[]},{"level":2,"title":"columns","slug":"columns","link":"#columns","children":[]},{"level":2,"title":"size","slug":"size","link":"#size","children":[]},{"level":2,"title":"rows","slug":"rows","link":"#rows","children":[{"level":3,"title":"rows.rowGap","slug":"rows-rowgap","link":"#rows-rowgap","children":[]},{"level":3,"title":"rows.columnGap","slug":"rows-columngap","link":"#rows-columngap","children":[]}]}],"git":{"updatedTime":1769341062000,"contributors":[{"name":"NicolasHome","username":"NicolasHome","email":"1556363381@qq.com","commits":8,"url":"https://github.com/NicolasHome"}],"changelog":[{"hash":"59a58ff3f2fe85038cbc0ed87171f9a115863b20","time":1769341062000,"email":"1556363381@qq.com","author":"NicolasHome","message":"docs: Updated Formkit component API documentation examples and removed deprecated configurations"},{"hash":"d1c536155b9b0a2d80e4c1d61cb5707935a9cf70","time":1767959978000,"email":"1556363381@qq.com","author":"NicolasHome","message":"Refactor docs: improve English, unify structure, and relocate files"},{"hash":"6399d1cdb8ebd86c7dfce8ac4def1124773837a3","time":1767950422000,"email":"1556363381@qq.com","author":"NicolasHome","message":"Add multilingual documentation structure"},{"hash":"9e9da53aef9965d9efac77e912267d4a5add5a77","time":1767927591000,"email":"1556363381@qq.com","author":"NicolasHome","message":"Expand config API docs and move rules section"},{"hash":"495415f1255265169542985c3138235e11122402","time":1766029095000,"email":"1556363381@qq.com","author":"NicolasHome","message":"Update API docs and revert package version"},{"hash":"ec08ee10237d5961f3bc58c2ee8476f290037704","time":1766028751000,"email":"1556363381@qq.com","author":"NicolasHome","message":"Add Expose API documentation and update references"},{"hash":"f5b5f93e7c78b40b338546c4bc1373cf5b5ebf8f","time":1751510953000,"email":"1556363381@qq.com","author":"NicolasHome","message":"Modify the address module's web request prop name"},{"hash":"397ed17c2ef1171608f4e92895829500f422330c","time":1751283533000,"email":"1556363381@qq.com","author":"NicolasHome","message":"Update Doc"}]},"filePathRelative":"formkit-api.md"}`);export{q as comp,y as data};
