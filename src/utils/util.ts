export function isString(value: any): boolean {
  return typeof value === 'string';
}

export function isNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: any): boolean {
  return typeof value === 'boolean';
}

export function isFunction(value: any): boolean {
  return typeof value === 'function' && value.constructor === Function
}

export function isObject(value: any): boolean {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}

export function isArray(value: any): boolean {
  return Array.isArray(value);
}

const FULL_WIDTH_CHAR = /[\u1100-\u115F\u2E80-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFF60\uFFE0-\uFFE6]/;
export function stripHtml(text: any): string {
  return isString(text) ? text.replace(/<[^>]*>/g, '') : '';
}
// Estimate label pixel width by character count (based on Element Plus default 14px font size)
export function measureLabelWidth(label: any, hasRequired: boolean = false): number {
  if (!isString(label) || label.length === 0) return 0;
  const text = label.replace(/<[^>]*>/g, '');
  let width = 0;
  for (const char of text) {
    width += FULL_WIDTH_CHAR.test(char) ? 14 : 8;
  }
  if (hasRequired) width += 12;
  return width + 20;
}

export function uuidv4(): string {
  try {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  } catch (e) {
    return Number(new Date()).toString(36) + Math.random().toString(36).substring(2, 15);
  }
}