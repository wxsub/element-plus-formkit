<h1 align="center">Element-plus-formkit</h1>

<p align="center">
    基于 ElementPlus 对表单组件进行组合包装，通过数据流的方法对表单数据进行处理，便于快速开发。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/element-plus-formkit">
    <img src="https://img.shields.io/npm/v/element-plus-formkit" />
  </a>
  <a href="https://github.com/wxsub/element-plus-formkit">
    <img src="https://img.shields.io/npm/l/element-plus-formkit" />
  </a>
  <a href="https://www.npmjs.com/package/element-plus-formkit">
    <img src="https://img.shields.io/npm/dm/element-plus-formkit" />
  </a>
  <a href="https://github.com/wxsub/element-plus-formkit">
    <img src="https://img.shields.io/badge/node-%3E%3D16-lightgreen?logo=node.js&labelColor=darkgreen&color=brightgreen" />
  </a>
  <br>
</p>

**中文** | [English](./README.md)

要查看实时示例和文档，请访问[文档]([https://wxsub.github.io/element-plus-formkit](https://wxsub.github.io/element-plus-formkit/get-started.html))。

## 安装项目
```
pnpm add element-plus-formkit@latest
```

## 使用
```
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import formkit, { setConfigure, registerModule } from 'element-plus-formkit';

const app = createApp(App);
app.use(formkit);

app.mount('#app');
```

### registerModule
Formkit 允许您注册自定义组件
```
import CustomEditor from './components/CustomEditor.vue'
registerModule('customEditor', CustomEditor)

// formkit item config
{
    type: 'customEditor', // Using custom modules
    key: 'content',
    label: 'Article'
}
```

### setConfigure
Formkit 接受大量全局配置参数，如文件上传网络地址等。
```
// 设置全局配置（可在安装前或安装后设置）
import formkit, { setConfigure } from 'element-plus-formkit'
import type { UploadRequesterOptions } from 'element-plus-formkit/types/formkit-types'
import 'element-plus-formkit/dist/index.css'

setConfigure('upload', async (file: File, options: UploadRequesterOptions) => {
    const UploadFormData = new FormData()
    UploadFormData.append('file', file)
    const response = await useAxios().post("/default/oss/upload", UploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
            const total = progressEvent.total || 1,
                loaded = progressEvent.loaded;
            options.onProgress?.({ total, loaded })
        }
    })
    return response
})

app.use(formkit, {
  // 可选：也可在此处传递配置（将与 setFormKitConfig 合并）
  // apiTimeout: 10000
});
```
**请注意，formkit 依赖于 elementplus 表单进行开发，您需要在系统中引入 elementplus。**

## Component Attributes
| 参数         | 说明    |    类型   |  默认值  | 
| -------- | :-----  |  :----:  |  :----: |
| model-value / v-model |  组件绑定数据源  |  Object  |   {}
| config |  表单配置项，详细config配置参数参考下方`config Attributes`  |  Array  |   []
| disabled |  禁用整个表单  |  Boolean  |   false  
| labelPosition |  表单项label对齐规则，参照[ElementPlus Form Attributes](https://element-plus.org/zh-CN/component/form.html#form-api)  |  String  |   top  
| labelWidth |  表单项标题宽度（此参数仅在labelPosition为left、right时生效，为top时会自动忽略）  |  Number  |   125 
| columns |  每行显示多少列表单项  |  Number / String  |   5  
| size |  用于控制该表单内组件的尺寸（可选值: '' / 'large' / 'default' / 'small'）  |  String  |   mini 
| rows |  参照[ElementPlus Row API](https://element-plus.org/zh-CN/component/layout.html#row-api)  |  String  |   top

**注意**： `columns`设置为字符串`'auto'`后`label-width`将失效，失效后的计算结果为`0px`

## Config Attributes
| 参数         |  说明  |  可选值  |   类型   |  案例
| -------- | :-----:  |  :----: |  :----:  | :----: |
| label |  表单项名称  |   -   |  String  |  -
| type |  该表单项类型  |   可自行配置，默认见下Config type explain   |  String  | -
| disabled |  该表单项是否禁用  |   true / false   |  boolean  |  -
| keys |  表单项key值(该项应该和后台返回该表单项的字段对应，方便将修改后的数据与后台直接交互)  |   -   |  String  |  -
| span |  当前项栅格占据的列数  |   24   |  number  |   24
| labelWidth |  标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。  |   -   |  string / number  |   ''
| rules |  表单项校验规则，为空不校验  |   -   |  Array  |   -
| options |  select、cascader等组件的操作项  |   -   |  Array  |  ` options: [{ name: '全天营业', id: 'ALL' }] `
| request |  该表单项需要进行远程数据加载的自定义请求  |   -   |  Promise  |  ` request: useAxios().get('/default/shop/category-tree') `
| handle |  配合远程数据加载，处理远程数据  |   -   |  Function  |  ` handle: (response: any) => Array.isArray(response) ? response : [] `
| props |  直接绑定到组件上的参数  |   -   |  Object  |  `props: { placeholder: '请输入店铺编码', max: 10 }`
| visible |  该表单项显示需要关联的字段  |   -   |  Object  |  ` visible: { key: "showid", value: 0 } `表示表单内字段`showid`的值为0时该项不显示
| events |  接受组件事件  |   -   |  Object  |  -
| hint |  在当前行下方显示提示文本  |   -   |  string  |  -

## Config type explain
| 关键字         |  说明  |  备注
| -------- | :-----:  |  :----: |
| input |  输入框  |  -
| select |  下拉选择框  |  -
| datePicker |  日期时间选择器  |  [文档](https://element-plus.org/zh-CN/component/datetime-picker.html)
| timePicker |  时间选择器  |  [文档](https://element-plus.org/zh-CN/component/time-picker.html)
| cascader |  级联选择器  |  [文档](https://element-plus.org/zh-CN/component/cascader.html)
| remoteSearchSelect |  带远程搜索功能的input  |  参数回显请使用initialValue字段
| address |  地址选择器  |  内部fetchAddressData方法需要修改API接口
| checkbox |  多选框  |  -
| radio |  单选框  |  -
| inputNumber |  数字输入框  |  -
| upload |  文件上传  |  需要在utils/upload.class.ts修改uploadUrl
| rate |  评分  |  [文档](https://element-plus.org/zh-CN/component/rate.html)

## FormKit Slots
| 插槽名         |  说明  |  参数
| -------- | :-----:  | :-----:  |
| prepend |  输入框前置内容 | -
| append |  表单项后置内容 | -
| content |  表单平级内容 | configs => 配置项
| ${config.keys} |  表单项内容组件平级内容 | row => 当前config项、value => 组件绑定值

## Exposes
| 名称         |  说明 |  参数  |  类型
| -------- | :-----:  | :-----:  | :-----:  |
| validate | 立即校验表单项 | openTips => 校验失败是否弹出提示 | Promise
| clearValidate | 清除表单校验项 | - | Function
