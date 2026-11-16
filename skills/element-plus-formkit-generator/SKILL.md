---
name: "element-plus-formkit-generator"
description: "Generate form code using element-plus-formkit. Triggered when the user needs to build/create any form, whether from an uploaded image, a description, or any other requirement."
---

# Form Development

Whenever the user needs to build or create a form — whether from an uploaded image, a text description, or any other requirement — use this skill to generate form code using the `element-plus-formkit` component.

> This skill is not limited to image-based scenarios. Any request involving form creation should use this skill.

## Workflow

### Step 1: Analyze the Requirement

Carefully examine the uploaded image or description and identify all form elements. For each form field, extract the following information:

- **Label**: The display text of the form field (e.g. "Name", "Department Name")
- **Type**: The form control type (refer to the type mapping table below)
- **Required**: Whether the field is marked as required (usually indicated by a red asterisk `*`)
- **Options**: For dropdown/radio/checkbox fields, extract all available options
- **Layout**: Observe the form layout (number of columns, groups, sections)

### Step 2: Map FormKit Config Types

Based on the form elements, map them to the corresponding formkit `type`. For full module documentation, refer to: [element-plus-formkit Modules](https://wxsub.github.io/element-plus-formkit/modules.html)

> **IMPORTANT**: Only the module types listed below actually exist in the component. Do NOT invent types such as `dict`, `vCascader`, `colorPicker`, or `textarea` — they are NOT registered modules and will fail at runtime.

#### Basic Modules

| Visual Element | formkit `type` | Description |
|---|---|---|
| Single-line text input | `input` | Default type for text fields |
| Multi-line textarea | `input` + `props: { type: 'textarea' }` | There is no standalone `textarea` type |
| Password input | `input` + `props: { type: 'password', showPassword: true }` | |
| Number input | `inputNumber` | Dedicated number module; supports `props: { prefix, suffix }` (HTML allowed) in addition to ElInputNumber props |
| Autocomplete input | `autocomplete` | ElAutocomplete with suggestions |
| Tag input | `inputTag` | Add content as tags. Requires element-plus >= 2.9.0 |

#### Selection Modules

| Visual Element | formkit `type` | Description |
|---|---|---|
| Dropdown select | `select` | Requires `options` array in `{ name, id }` format. Supports dynamically fetching options via `requester`/`handler` fields. Supports `props: { onChoose: (value, selectedLabel, options) => {} }` callback |
| Virtualized select | `selectV2` | ElSelectV2 for large option lists |
| Remote search select | `remoteSearchSelect` | Search-as-you-type select. Its `requester(query)` receives the search keyword; see "Standalone Requester Modules" below |
| Tree select | `treeSelect` | ElTreeSelect; `options` is tree data with `{ id, name, children }` (keys customizable via `labelKey`/`valueKey`) |
| Cascader | `cascader` | ElCascader for hierarchical data. Requires `options` array in `{ value, label, children }` format |
| Address (lazy cascader) | `address` | Lazy-loaded region cascader. Requires a `requester`; see "Standalone Requester Modules" below. Use `props: { level }` for cascade depth and `props: { cascaderProps }` to override the internal ElCascader lazy config |
| Popover panel select | `popover` | ElCascaderPanel inside a click popover; `options` is tree data with `{ id, name, children }`. Configure the inner panel via the nested `props: { props: { multiple: true } }` (note the double `props`) |
| Radio buttons | `radio` | Requires `options` array in `{ name, id }` format. Use `props: { type: 'button' }` for el-radio-button style; per-option `disabled` is supported |
| Checkboxes | `checkbox` | Requires `options` array in `{ name, id }` format. Supports `props: { showAllCheck: true }` for a "Select All" checkbox |
| Switch | `switch` | Toggle between two states. Commonly uses `props: { inlinePrompt: true, activeText: '...', inactiveText: '...' }` |

#### Date/Time Modules

| Visual Element | formkit `type` | Description |
|---|---|---|
| Date picker | `datePicker` | Defaults to 100% width (built-in inline style). Use `props: { valueFormat: 'YYYY-MM-DD' }` |
| DateTime picker | `datePicker` + `props: { type: 'datetime' }` | |
| Date range picker | `datePicker` + `props: { type: 'daterange' }` | |
| DateTime range picker | `datePicker` + `props: { type: 'datetimerange' }` | |
| Time picker | `timePicker` | ElTimePicker |
| Time range picker | `timePicker` + `props: { isRange: true }` | |
| Time select | `timeSelect` | ElTimeSelect (fixed time intervals) |

> **Note**: The `datePicker` module already applies `width: 100%` by default — do NOT add `class: '!w-full'` to its props.

#### Advanced Modules

| Visual Element | formkit `type` | Description |
|---|---|---|
| File upload | `upload` | See "Upload Module" below. Upload request is configured globally via `setConfigure('upload', ...)` |
| Mention (@mention) | `mention` | Mention someone/something in input. Supports `options` array or `requester` for dynamic fetching. Requires element-plus >= 2.8.0 |
| Rate (rating) | `rate` | Star rating component |
| Slider | `slider` | Slider selection. Uses `props: { min, max, step }` |

#### Option Key Mapping (`valueKey` / `labelKey`)

Modules that render options (`select`, `radio`, `checkbox`, `mention`, `treeSelect`, `remoteSearchSelect`, `address`, `popover`) read the display text from the `name` field and the value from the `id` field by default. Override via props:

```ts
{
    type: 'select',
    label: 'Status',
    key: 'status',
    options: [{ text: 'Enabled', code: 1 }],
    props: { labelKey: 'text', valueKey: 'code' }
}
```

#### Dynamic Options Loading (`requester` + `handler`)

For non-standalone modules (e.g. `select`, `mention`), formkit itself executes the `requester` on mount and feeds the result into the module's `options`:

```ts
{
    type: 'select',
    label: 'Selector',
    key: 'dynamicSelect',
    props: { placeholder: 'Please select' },
    requester: async () => {
        const response = await fetchOptions()
        return response
    },
    handler: (response: any) => response?.items || []
}
```

**Standalone Requester Modules**: `address`, `remoteSearchSelect`, and `upload` handle their own requests — their `requester`/`handler` are passed down as component props instead of being executed by formkit:

```ts
{
    type: 'remoteSearchSelect',
    label: 'User',
    key: 'userId',
    requester: async (keyword: string) => searchUsers(keyword), // receives the search keyword
    handler: (response: any) => response?.items || [],
    props: { placeholder: 'Type to search', initialValue: '' }
}
```

```ts
{
    type: 'address',
    label: 'Region',
    key: 'region',
    requester: async (pid: string | number, level?: number) => fetchRegions(pid), // lazy load by parent id
    props: { level: 3 } // cascade depth
}
```

#### Cascader Options Format

Cascader `options` use the ElCascader default `{ value, label, children }` structure:

```ts
{
    type: 'cascader',
    label: 'Cascader',
    key: 'cascaderValue',
    options: [
        {
            value: 'guide',
            label: 'Guide',
            children: [
                {
                    value: 'disciplines',
                    label: 'Rules',
                    children: [
                        { value: 'consistency', label: 'Consistency' },
                        { value: 'feedback', label: 'Feedback' }
                    ]
                }
            ]
        }
    ],
    props: { placeholder: 'Please select data', clearable: true }
}
```

#### Upload Module

The `upload` module renders an image/file picker. Config item:

```ts
{
    type: 'upload',
    label: 'Avatar',
    key: 'avatar'
    // props below are all optional:
    // accept: 'image/*' (default) | '.pdf' | ...
    // limit: 1 (default); -1 means unlimited; modelValue is a string when limit === 1, string[] otherwise
    // width / height: 80 (default, px)
    // fileSize: 0 (default, MB; 0 = no limit)
    // autoUpload: true (default)
    // beforeUpload: async (fileItem) => {}
    // afterUpload: (response) => response.url  // map server response to stored path
    // isCustom: false // true renders default slot as trigger
}
```

The actual upload request MUST be configured once globally (do not duplicate per form):

```ts
import { setConfigure } from 'element-plus-formkit'

setConfigure('upload', async (file: File, { onProgress }) => {
    // upload the file and return the accessible URL
    return url
})

// Optional: switch locale (default is zh-cn)
import en from 'element-plus/es/locale/lang/en'
setConfigure('lang', en)
```

#### Custom Module Registration

When built-in modules don't cover a need, register a custom module (or override a built-in one) once at app entry, then reference it by `type` in any config:

```ts
import { registerModule } from 'element-plus-formkit'
import MyCustomField from './MyCustomField.vue'

registerModule('myField', MyCustomField)

// then in config:
// { type: 'myField', label: 'Custom', key: 'custom' }
```

A custom module component must accept `modelValue` and emit `update:modelValue`; it also receives `options`, `disabled`, and everything under `props`.

The package additionally exports standalone components `Upload`, `Address`, `Popover`, and the `Uploader` class for direct use outside of formkit.

### Step 3: Generate Config Array

Generate a formkit config array. Each config item follows this structure (from the component's `ConfigInterface`):

```ts
{
    type: 'input',          // formkit module type (optional; omit when fully replacing via #[key] slot)
    label: 'Field Label',   // display label (supports HTML)
    key: 'fieldName',       // data binding key (use camelCase)
    span: 12,               // grid span (24-grid system), higher priority than the component's `columns` prop
    labelWidth: 150,        // per-item label width: number (px) or 'auto'; overrides the component prop
    disabled: false,        // disable this item only
    visible: { key: 'type', value: 1 }, // conditional visibility, see below
    hint: 'Tip shown below the field',  // supplementary note under the field (v-html supported)
    rules: [{ required: true, message: 'Please enter xxx', trigger: 'change' }],  // el-form-item validation rules
    options: [...],         // options for select/radio/checkbox/cascader/mention/treeSelect/popover
    events: { change: (val) => {} },    // native component events, see below
    col: { xs: 24 },        // extra el-col props for this item
    props: {                // element-plus / module component props
        placeholder: 'Please enter xxx',
        clearable: true
    }
}
```

**Key Naming Rules:**
- Use camelCase (e.g. `deptName`, `phone`, `createTime`)
- Names should be descriptive yet concise
- Map Chinese label meanings to English (e.g. "机构名称" -> `deptName` or `institutionName`)

**Options Format (select/radio/checkbox):**
```ts
options: [
    { name: 'Display Name', id: 'value' },
    { name: 'Display Name 2', id: 'value2' }
]
```

**Conditional Visibility (`visible`):**
```ts
// Shown only when formData.type === 1
{ type: 'input', label: 'Reason', key: 'reason', visible: { key: 'type', value: 1 } }

// Shown when formData.type is truthy
{ type: 'input', label: 'Reason', key: 'reason', visible: { key: 'type' } }

// Shown when ANY condition matches
{ type: 'input', label: 'Reason', key: 'reason', visible: [{ key: 'type', value: 1 }, { key: 'type', value: 2 }] }

// Boolean also works
{ type: 'input', label: 'Reason', key: 'reason', visible: false }
```

**Item Events (`events`):**

Event names are auto-normalized — `change` and `onChange` are equivalent; hyphenated names are camelCased:

```ts
{
    type: 'input',
    label: 'Name',
    key: 'name',
    events: {
        input: (val: string) => console.log(val),
        'visible-change': (val: boolean) => {}
    }
}
```

### Step 4: Generate Complete Vue Component Code

Generate code containing the following:

1. **Template**: Use the `<formkit>` component with `:config` and `v-model`
2. **Script**: Import formkit, define reactive form data and config

#### Template Pattern

```vue
<template>
  <formkit
    :config="formConfig"
    v-model="formData"
    label-position="right"
    :label-width="120"
    :columns="2"
    :gap="{ col: 30, row: 20 }"
    ref="formRef"
    @update="onFieldUpdate"
    @error="onRequestError"
  />
</template>
```

**formkit Component Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `config` | `ConfigInterface[]` | `[]` | Form field configuration array |
| `v-model` | `Object` | (required) | Reactive form data object |
| `label-position` | `'left' \| 'right' \| 'top'` | `'top'` | Label position |
| `label-width` | `Number \| 'auto'` | `120` | Uniform label width (px) for all items; `'auto'` measures each label's actual rendered width. Only effective when `label-position` is `'left'` or `'right'`. Per-item `labelWidth` (number or `'auto'`) has higher priority |
| `columns` | `Number` | `1` | Form items per row for quick uniform layout |
| `gap` | `Object` | `{ col: 10, row: 12 }` | Spacing: `{ col, row }` (px) |
| `size` | `'' \| 'small' \| 'default' \| 'large'` | `'default'` | Component size |
| `disabled` | `Boolean` | `false` | Disable all form items |
| `rules` | `Object` | — | Form-level el-form rules object (alternative to per-item `rules`) |

**Component Events:**

| Event | Payload | Description |
|---|---|---|
| `@update` | `{ event, config }` | Fired when any field's value changes |
| `@error` | `{ key, error, requester }` | Fired when a field's `requester` fails |

> **label-width Calculation Strategy** (only effective when `label-position` is `'left'` or `'right'`):
> 1. Simplest: set `label-width="auto"` on the component — formkit measures the actual rendered label width per item automatically (required-field asterisks included)
> 2. Or estimate an average width and set it as the numeric component prop `:label-width="120"`
> 3. If a specific item needs a different width, set `labelWidth: 150` (number, px) or `labelWidth: 'auto'` in that config item — it overrides the component prop
>
> ```vue
> <formkit label-width="auto" label-position="right" ... />
> ```
> ```ts
> // Per-item override (number only — strings like '150px' are NOT supported)
> { type: 'radio', label: 'Central Local Unit Identifier', key: 'unitId', labelWidth: 150 }
> ```

#### Script Pattern

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import formkit, { type FormKitExposed } from 'element-plus-formkit'

const formData = reactive<Record<string, any>>({})

const formConfig = reactive([
  // ... generated config items
])

const formRef = ref<FormKitExposed>()

async function onSubmit() {
  await formRef.value?.validate()
  // submit logic
  console.log(formData)
}

function onFieldUpdate({ event, config }: any) {
  // field value changed
}

function onRequestError({ key, error }: any) {
  // requester failed
}
</script>
```

**Exposed Methods (via template ref, typed as `FormKitExposed`):**

| Method | Description |
|---|---|
| `validate()` | Validate the whole form (el-form validate) |
| `validateField(key)` | Validate specific field(s) |
| `clearValidate(props?)` | Clear validation state |
| `resetFields(props?)` | Reset fields to initial values |
| `scrollToField(prop)` | Scroll to a field |
| `setInitialValues(obj)` | Set form values programmatically |
| `fields` | el-form field contexts |
| `buckets` | Reactive store of `requester`-fetched option lists keyed by field key |

### Step 5: Handle Special Cases

**Grouped Form Sections:**
If the form has groups/sections, use `el-divider` or section titles between multiple `<formkit>` instances:

```vue
<div class="form-section-title">Basic Information</div>
<formkit :config="basicConfig" v-model="formData" ... />
<el-divider />
<div class="form-section-title">Other Information</div>
<formkit :config="otherConfig" v-model="formData" ... />
```

**Span Fine-grained Layout Control:**

Both `columns` and `span` control the number of form items per row and do not conflict:
- `columns` is a component prop for quick uniform layout (e.g. `columns: 3` means exactly 3 items per row)
- `span` is a config item prop that divides each row into 24 equal parts, precisely controlling how many parts each item occupies, **with higher priority than `columns`**

**Usage Strategy:**
- If the form has a fixed number of columns per row, simply use `columns`
- If most rows have a fixed column count but some rows differ (e.g. a row with only 2 or 4 items), use `span` for those rows

**Example:** Assuming `columns: 3` (3 items per row, each taking 8 equal parts), but one row has only 2 items that should each take half:

```ts
// Previous items arranged normally, 3 per row
{ type: 'input', label: 'Name', key: 'name' },
{ type: 'input', label: 'Phone', key: 'phone' },
{ type: 'input', label: 'Email', key: 'email' },

// These two items should each take half (12 equal parts), overriding columns: 3 default behavior
{ type: 'input', label: 'Address', key: 'address', span: 12 },
{ type: 'input', label: 'Zip Code', key: 'zipCode', span: 12 },

// Full row (24 equal parts)
{
    type: 'input',
    label: 'Remark',
    key: 'remark',
    span: 24,
    props: {
        type: 'textarea',
        placeholder: 'Please enter remark',
        rows: 4
    }
}
```

**Disabled/Read-only Fields:**

```ts
{
    type: 'input',
    label: 'Field Label',
    key: 'fieldName',
    disabled: true,
    props: {
        placeholder: 'Auto generated'
    }
}
```

**Field Hints:**

```ts
{
    type: 'input',
    label: 'ID Card',
    key: 'idCard',
    hint: 'Used for identity verification only'  // rendered under the field, v-html supported
}
```

**Slots:**

formkit supports various slots for extending form content. For full documentation, refer to: [element-plus-formkit Slots](https://wxsub.github.io/element-plus-formkit/slot.html)

| Slot Name | Scope | Description |
|---|---|---|
| `#prepend` | — | Insert content before all config items (inside the grid row) |
| `#append` | `{ value }` (the modelValue) | Append content after all config items (inside the grid row) |
| `#content` | `{ config }` | Append after the entire form, outside the grid |
| `#[key]` | `{ row, value, size }` | Rendered inside the form item for that key. To fully replace the module, omit `type` from that config item |
| `#[key]-[native slot name]` | native slot props | Forwarded to the underlying element-plus component's slot, e.g. `#sex-prefix`, `#sex-empty` |

**prepend/append Example:**

```vue
<formkit :config="formConfig" v-model="formData">
    <template #prepend>
        <el-col :span="24">
            <b>Tip information at the top of the form</b>
        </el-col>
    </template>
    <template #append>
        <el-col :span="24">
            <el-button type="primary" @click="onSubmit">Submit</el-button>
        </el-col>
    </template>
</formkit>
```

**[key] Replace Module Example:**

```vue
<formkit
    :config="[
        { label: 'Nickname', key: 'nickname' }
    ]"
    v-model="formData">
    <!-- type omitted, module fully replaced by slot content -->
    <template #nickname="{ row, value, size }">
        <el-input v-model="formData.nickname" placeholder="Custom nickname component" />
    </template>
</formkit>
```

**Native Component Slot Example:**

```vue
<formkit
    :config="[
        { label: 'Gender', type: 'select', key: 'sex', options: [...], props: { placeholder: 'Please select' } }
    ]"
    v-model="formData">
    <!-- Access el-select's prefix slot -->
    <template #sex-prefix>
        <el-icon><User /></el-icon>
    </template>
</formkit>
```

### Step 6: Output Format

Present the generated code to the user in the following order:

1. **Analysis Summary**: Briefly describe the form fields identified from the requirement
2. **Config File** (`xxxFormConfig.ts`): Form configuration array
3. **Vue Component** (`xxx.vue`): Complete component using formkit

Always follow these conventions:
- Use `<script setup lang="ts">`
- Use `reactive()` to define config arrays
- Use `computed()` for configs that depend on reactive data
- Import formkit: `import formkit, { type FormKitExposed } from 'element-plus-formkit'`
- Label text must match the requirement exactly
- Use meaningful camelCase format keys

### Important Notes

- **File Operation Scope**: If the user specifies a file or code block to operate on, file modifications must be strictly limited to that file only, and other files must not be modified. If the user does not specify a file, **you must first ask the user which file to generate/modify code in**, and only proceed after confirmation.
- Do not add CSS import statements in generated components — styles ship with the package
- When unsure about a field type, default to `input`
- When unsure whether a field is required, do not add `rules`
- The formkit instance type is `FormKitExposed` (exported from `element-plus-formkit`) — NOT `Instance`
- For upload fields, the project configures the request globally via `setConfigure('upload', ...)` — do not duplicate this configuration
- Only use module types listed in Step 2. Invalid types render an "Unable to find module" placeholder at runtime
