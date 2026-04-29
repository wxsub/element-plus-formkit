---
name: "element-plus-formkit-generator"
description: "Generate form code using element-plus-formkit. Triggered when the user needs to build/create any form, whether from an uploaded image, a description, or any other requirement."
---

# Form Development

Whenever the user needs to build or create a form — whether from an uploaded image, a text description, or any other requirement — use this skill to generate form code using the `element-plus-formkit` component.

> This skill is not limited to image-based scenarios. Any request involving form creation should use this skill.

## Workflow

### Step 1: Analyze the Image

Carefully examine the uploaded image and identify all form elements. For each form field, extract the following information:

- **Label**: The display text of the form field (e.g. "Name", "Department Name")
- **Type**: The form control type (refer to the type mapping table below)
- **Required**: Whether the field is marked as required (usually indicated by a red asterisk `*`)
- **Options**: For dropdown/radio/checkbox fields, extract all available options
- **Layout**: Observe the form layout (number of columns, groups, sections)

### Step 2: Map FormKit Config Types

Based on the visual form elements in the image, map them to the corresponding formkit `type`. For full module documentation, refer to: [element-plus-formkit Modules](https://wxsub.github.io/element-plus-formkit/modules.html)

#### Basic Modules

| Visual Element | formkit `type` | Description |
|---|---|---|
| Single-line text input | `input` | Default type for text fields |
| Multi-line textarea | `input` + `props: { type: 'textarea' }` | Or use `textarea` type |
| Password input | `input` + `props: { type: 'password', showPassword: true }` | |
| Number input | `input` + `props: { type: 'number' }` | |

#### Selection Modules

| Visual Element | formkit `type` | Description |
|---|---|---|
| Dropdown select | `select` | Requires `options` array in `{ name, id }` format. Also supports dynamically fetching options via `requester` field |
| Dictionary dropdown | `dict` | When options come from system dictionary, use `props: { type: 'dict_key' }` (project-specific) |
| Cascader | `cascader` | For hierarchical data with clear parent-child structure. Requires `options` array in `{ value, label, children }` format |
| Custom cascader | `vCascader` | Project-specific cascader component |
| Radio buttons | `radio` | Requires `options` array in `{ name, id }` format |
| Checkboxes | `checkbox` | Requires `options` array in `{ name, id }` format |
| Switch | `switch` | Toggle between two states. Commonly uses `props: { inlinePrompt: true, activeText: '...', inactiveText: '...' }` |

#### Date/Time Modules

| Visual Element | formkit `type` | Description |
|---|---|---|
| Date picker | `datePicker` | Add `class: '!w-full'` in props by default. Use `props: { valueFormat: 'YYYY-MM-DD', class: '!w-full' }` |
| DateTime picker | `datePicker` + `props: { type: 'datetime', class: '!w-full' }` | |
| Date range picker | `datePicker` + `props: { type: 'daterange', class: '!w-full' }` | |
| DateTime range picker | `datePicker` + `props: { type: 'datetimerange', class: '!w-full' }` | |

> **Note**: When datetime form fields are detected in the image, always add `class: '!w-full'` to the `props` of that config item by default.

#### Advanced Modules

| Visual Element | formkit `type` | Description |
|---|---|---|
| File upload | `upload` | Uses `props: { accept, width, height }`. Upload configuration is set globally via `setConfigure('upload', ...)` |
| Input tag | `inputTag` | Allows users to add content as tags. Requires element-plus >= 2.13.3 |
| Mention (@mention) | `mention` | Mention someone/something in input. Supports `options` array or `requester` for dynamic fetching. Unique properties: `valueKey`, `labelKey` |
| Rate (rating) | `rate` | Star rating component |
| Color picker | `colorPicker` | Color selection |
| Slider | `slider` | Slider selection. Uses `props: { min, max, step }` |
| Time picker | `timePicker` | Time selection |
| Time range picker | `timePicker` + `props: { isRange: true }` | |

#### Dynamic Options Loading

Modules such as `select` and `mention` support dynamically fetching options via `requester` + `handler` fields:

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

#### Cascader Options Format

Cascader `options` use a different format from regular selectors, with `{ value, label, children }` structure:

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

### Step 3: Generate Config Array

Generate a formkit config array following the project's existing pattern. Each config item follows this structure:

```ts
{
    type: 'input',          // formkit module type
    label: 'Field Label',   // display label
    key: 'fieldName',       // data binding key (use camelCase)
    rules: [{ required: true, message: 'Please enter xxx', trigger: 'change' }],  // validation rules (add when required)
    props: {                // element-plus component props
        placeholder: 'Please enter xxx',
        clearable: true,
        // ...other element-plus props
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
  />
</template>
```

**Common formkit Component Properties:**
| Property | Type | Description |
|---|---|---|
| `config` | `Array` | Form field configuration array |
| `v-model` | `Object` | Reactive form data object |
| `label-position` | `String` | Label position: `'left'` / `'right'` / `'top'` |
| `label-width` | `Number` | Component prop (Number): sets the uniform label width for all form items. Can also be used in individual config items (String) for precise control, with higher priority than the component prop |

> **label-width Calculation Strategy** (only effective when `label-position` is `'left'` or `'right'`, ignored when `'top'`):
> 1. Analyze the label widths of all form items in the image, calculate an average, and set it as the component prop `label-width` (number type)
> 2. If a form item has a label significantly wider than the average, precisely specify `labelWidth: '150px'` (string type) in that config item to prevent label text wrapping
>
> Example: Most labels are about 80px wide, but one label "Central Local Unit Identifier" is about 150px wide:
> ```ts
> // Set uniformly on component
> <formkit :label-width="80" ... />
>
> // Override precisely in the specific config item
> { type: 'radio', label: 'Central Local Unit Identifier', key: 'unitId', labelWidth: '150px', ... }
> ```
| `columns` | `Number` | Number of form items per row for quick uniform layout (e.g. `columns: 3` means 3 items per row) |
| `span` | `Number` | Grid span for a single form item (24-grid system), configured in the config item, with higher priority than `columns` |
| `gap` | `Object` | Spacing between items: `{ col: 30, row: 20 }` (`col` is column gap, `row` is row gap) |
| `size` | `String` | Component size: `'large'` / `'default'` / `'small'` |
| `disabled` | `Boolean` | Disable all form items |
| `ref` | `String` | Template reference for accessing form methods (e.g. `validate()`) |

#### Script Pattern

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import formkit, { type Instance } from 'element-plus-formkit'

const dataset = reactive<Record<string, any>>({})

const formConfig = reactive([
  // ... generated config items
])

const formRef = ref<Instance>()

async function onSubmit() {
  await formRef.value?.validate()
  // submit logic
  console.log(dataset)
}
</script>
```

### Step 5: Handle Special Cases

**Dictionary Dropdown Fields:**
If the dropdown select field in the image may use system dictionary data:
```ts
{
    type: 'dict',
    label: 'Field Label',
    key: 'fieldName',
    props: {
        placeholder: 'Please select xxx',
        type: 'dictionary_key'  // dictionary type key
    }
}
```

**Grouped Form Sections:**
If the form has groups/sections, use `el-divider` or section titles between multiple `<formkit>` instances:
```vue
<div class="modify-dialog-title">Basic Information</div>
<formkit :config="basicConfig" v-model="formData" ... />
<el-divider />
<div class="modify-dialog-title">Other Information</div>
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

**Slots:**

formkit supports various slots for extending form content. For full documentation, refer to: [element-plus-formkit Slots](https://wxsub.github.io/element-plus-formkit/slot.html)

| Slot Name | Description | Use Case |
|---|---|---|
| `#prepend` | Insert content before all config items | For top-of-form notes, tips, etc. |
| `#append` | Append content after all config items | For bottom-of-form buttons, additional actions, etc. |
| `#content` | Append after the entire form with less style interference | Receives `scope` parameter (contains `config`) |
| `#[key]` | Replace a specific key's form item module | Scoped slot, receives `scope: { row, size }`. To fully replace, remove the `type` from that config item |
| `#[key]-[native slot name]` | Access element-plus native component slots | E.g. `#sex-prefix`, `#sex-empty`, etc. |

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
        { label: 'Nickname', key: 'nickname', props: { placeholder: 'Please enter nickname' } }
    ]"
    v-model="formData">
    <!-- type removed, fully replaced by slot content -->
    <template #nickname="scope">
        <b>Custom nickname component</b>
        <p>Current config: {{ scope.row }}</p>
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

1. **Analysis Summary**: Briefly describe the form fields identified from the image
2. **Config File** (`xxxFormConfig.ts`): Form configuration array
3. **Vue Component** (`xxx.vue`): Complete component using formkit

Always follow the project's existing code conventions:
- Use `<script setup lang="ts">`
- Use `reactive()` to define config arrays
- Use `computed()` for configs that depend on reactive data
- Import formkit: `import formkit, { type Instance } from 'element-plus-formkit'`
- Label text must match the image exactly (Chinese)
- Use meaningful camelCase format keys

### Important Notes

- **File Operation Scope**: If the user specifies a file or code block to operate on, file modifications must be strictly limited to that file only, and other files must not be modified. If the user does not specify a file, **you must first ask the user which file to generate/modify code in**, and only proceed after confirmation.
- The `element-plus-formkit` package is already installed in the project (v1.0.6+)
- CSS has been imported in the project's main entry
- Do not add CSS import statements in generated components
- Follow the project's existing code style (refer to files under `src/pages/manage/`)
- When unsure about a field type, default to `input`
- When unsure whether a field is required, do not add `rules`
- The formkit `validate()` method is exposed via a template reference of type `Instance` (from `element-plus-formkit`)
- For upload fields, the project uses `setConfigure('upload', ...)` for upload configuration — do not duplicate this configuration
