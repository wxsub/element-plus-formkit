# Formkit Component Props

## model-value / v-model
Component binds to data source, type: `Object`

## config
Component configuration item, please refer to [Config Api](/config-api.md) for specific parameters. Type: `Array`

## disabled
Disable the entire form. Type: `Boolean`

``` vue{3}
<formkit
    v-model="dataset"
    :disabled="true"
/>
```

## labelPosition
Position of the form item label, when set to left or right, you also need to set the label-width attribute.

> Options: 'left' | 'right' | 'top'

## labelWidth
Length of the form item label, for example '50px'. form-item as a direct child of Form will inherit this value. You can use auto.

## columns
Number of form items allowed per row.

> type: [Number, String]

## size
Size of the form item.

> Options: '' | 'large' | 'default' | 'small'

## rows
Table row item settings, type: `Object`

### rows.rowGap
Horizontal spacing between form items. Type: `Number`

Default: 5

### rows.columnGap
Vertical spacing between form items. Type: `Number`

Default: 20
