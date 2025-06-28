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

export function uuidv4() {
  try {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  } catch (e) {
    return Number(new Date())
  }
}