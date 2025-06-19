# element-plus-formkit

**English** | [中文](./README.zh_CN.md)

Based on ElementPlus form components for the combination of packaging , through the data flow method of the form data , to facilitate rapid development.

**Project node version no less than 18.0.0**

## install
```
pnpm add element-plus-formkit
```

## Use Formkit components
```
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import FormKit, { setFormKitConfig, registerFormKitModule } from 'element-plus-formkit';

const app = createApp(App);
app.use(FormKit);

app.mount('#app');
```

### registerFormKitModule
Formkit allows you to register customized components
```
import CustomEditor from './components/CustomEditor.vue'
registerFormKitModule('customEditor', CustomEditor)

// formkit item config
{
    type: 'customEditor', // Using custom modules
    key: 'content',
    label: 'Article'
}
```

### setFormKitConfig
Formkit accepts a number of global configuration parameters, e.g. file upload network address, etc.
```
// Set global configuration (can be set before or after installation)
setFormKitConfig({
  uploadUrl: 'https://api.example.com/upload',
  apiAdapter: async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      body: data
    });
    return response.json();
  }
});

app.use(FormKitPro, {
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
| request |  This form item requires a custom request for remote data loading  |   -   |  Promise  |  ` request: useAxios().get('/default/shop/category-tree') `
| handle |  Processing remote data in conjunction with remote data loading  |   -   |  Function  |  ` handle: (response: any) => Array.isArray(response) ? response : [] `
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
