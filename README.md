<h1 align="center">Element-plus-formkit</h1>

<p align="center">
    Based on ElementPlus form components for the combination of packaging , through the data flow method of the form data , to facilitate rapid development.
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

**English** | [中文](./README.zh_CN.md)

To check out live examples and docs, visit [document](https://wxsub.github.io/element-plus-formkit/get-started.html).


## Install
```
pnpm add element-plus-formkit@latest
```

## Use Formkit components
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
Formkit allows you to register customized components
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
formkit accepts a number of global configuration parameters, e.g. file upload network, etc.
```
// Set global configuration (can be set before or after installation)
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
  // Optional: configuration can also be passed here (will be merged with setFormKitConfig)
  // apiTimeout: 10000
});
```
**Note that formkit relies on elementplus form for development, and you will need to introduce elementplus into your system.**

## Component Attributes
| Parameters | Description | Types | Defaults | 
| -------- | :----- | :----: | :----: |
| model-value / v-model | Component Binding Data Source | Object | {}
| config | Form configuration items, detailed config configuration parameters refer to `config Attributes` below | Array | []
| disabled | Disable entire form | Boolean | false  
| labelPosition | Label alignment rules, refer to [ElementPlus Form Attributes](https://element-plus.org/zh-CN/component/form.html#form-api) | String | top  
| labelWidth | labelWidth of the title of the form item (this parameter is only valid when labelPosition is left or right, and will be ignored when labelPosition is top) | Number | 125 
| columns | How many list items are displayed in each row | Number / String | 5  
| size | The size of the components in the form (optional: '' / 'large' / 'default' / 'small') | String | mini 
| rows | See [ElementPlus Row API](https://element-plus.org/zh-CN/component/layout.html#row-api) | String | top

**Note**: `label-width` will be invalidated when `columns` is set to the string `'auto'`, and the result will be `0px` when it is invalidated.

## Config Attributes
| Parameters | Description | Optional Values | Type | Case
| -------- | :-----:  |  :----: |  :----:  | :----: |
| label |  Form item name  |   -   |  String  |  -
| type | Type of this form item | Configurable, see below for default Config type explain | String | -
| disabled |  Whether the form item is disabled  |   true / false   |  boolean  |  -
| keys |  form item key value (this item should correspond to the field of the form item returned by the backend, so as to facilitate direct interaction between the modified data and the backend)  |   -   |  String  |  -
| span |  Number of columns occupied by the current item grid  |   24   |  number  |   24
| labelWidth |  The length of the label, e.g. '50px'. This value is inherited by form-item as a direct child of Form. auto can be used.  |   -   |  string / number  |   ''
| rules |  Form item validation rules, empty without validation  |   -   |  Array  |   -
| options |  Operational items for components such as select, cascader, etc.  |   -   |  Array  |  ` options: [{ name: 'Open all day', id: 'ALL' }] `
| requester |  This form item requires a custom requester for remote data loading  |   -   |  Promise  |  ` requester: useAxios().get('/default/shop/category-tree') `
| handler |  Processing remote data in conjunction with remote data loading  |   -   |  Function  |  ` handler: (response: any) => Array.isArray(response) ? response : [] `
| props |  Parameters bound directly to the component  |   -   |  Object  |  `props: { placeholder: 'Pls input shop code', max: 10 }`
| visible |  This form entry displays the fields that need to be associated  |   -   |  Object  |  ` visible: { key: "showid", value: 0 } `Indicates that the item is not displayed when the value of the field `showid` in the form is 0.
| events |  Accepting component events  |   -   |  Object  |  -
| hint |  Display prompt text below the current line  |   -   |  string  |  -

## Config type explain
| Keywords | Description | Remarks
| -------- | :-----: | :----: |
| input | input box | -
| select | drop-down selection box | -
| datePicker | DateTimePicker | [Documentation](https://element-plus.org/zh-CN/component/datetime-picker.html)
| timePicker | timePicker | [Documentation](https://element-plus.org/zh-CN/component/time-picker.html)
| cascader | Cascade Selector | [documentation](https://element-plus.org/zh-CN/component/cascader.html)
| remoteSearchSelect | input with remote search | Use the initialValue field for parameter fallback.
| address | addressSelect | Internal fetchAddressData method requires API modification.
| checkbox | radio | Radio | SingleCheckBox | checkboxes -
| radio | Radio | SingleCheckBox | -
| inputNumber | number input box | -
| upload | File Upload | uploadUrl needs to be modified in utils/upload.class.ts.
| rate | rating | [documentation](https://element-plus.org/zh-CN/component/rate.html)

## FormKit Slots
| Slot Name | Description | Parameters
| -------- | :-----: | :-----: |
| prepend | Input box front content | -
| append | form item post content | -
| content | form level content | configs => config item
| ${config.keys} | form item content component level content | row => current config item, value => component binding value

## Exposes
| Name | Description | Parameters | Type
| -------- | :-----: | :-----: | :-----: |
| validate | Validate form items now | openTips => If or not popup tips for failed validation | Promise
| clearValidate | clearValidate | - | Function
