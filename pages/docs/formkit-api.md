# 组件道具（props）

## model-value / v-model
组件绑定数据源，类型：`Object`

## config
组件配置项，具体参数请查阅[Config Api](/config-api.md)。类型：`Array`

## rules
表单项校验规则集合，具体规则校验参数请参阅[ElementPlus 表单校验](https://element-plus.org/zh-CN/component/form.html#%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C)

``` vue{7-9}
<formkit
    v-model="dataset"
    :config="[
        {
            type: 'input',
            label: '输入数字 (inputNumber)',
            rules: [
                { required: true, message: '输入数字不能为空' }
            ],
            key: 'input',
            props: {
                placeholder: '请输入数字'
            }
        }
    ]"
/>
```
配合组件实现完整的表单项校验，参考[Expose](/expose)

## disabled
禁用整个表单。类型：`Boolean`

``` vue{3}
<formkit
    v-model="dataset"
    :disabled="true"
/>
```

## labelPosition
表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性

> 可选项：'left' | 'right' | 'top'

## labelWidth
标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。

## columns
每行允许存在的表单项。

> type: [Number, String]

## size
表单项尺寸。

> 可选项：'' | 'large' | 'default' | 'small'

## rows
表格行项目设置，类型：`Object`

### rows.rowGap
表单项水平横向间距。类型：`Number`

默认: 5

### rows.columnGap
表单项垂直纵向间距。类型：`Number`

默认: 20