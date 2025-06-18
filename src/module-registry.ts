import { type Component } from 'vue';
import { Modules as BuiltInModules } from './asyncLoadModules';

class ModuleRegistry {
  private customModules: Record<string, Component> = {};
  
  registerModule(type: string, component: Component) {
    if (BuiltInModules[type]) {
      console.warn(`Overriding built-in module: ${type}`);
    }
    this.customModules[type] = component;
  }
  
  getModule(type: string): Component | undefined {
    return this.customModules[type] || BuiltInModules[type];
  }
  
  getAllModules(): Record<string, Component> {
    return { ...BuiltInModules, ...this.customModules };
  }
}

export const moduleRegistry = new ModuleRegistry();

export function registerFormKitModule(type: string, component: Component) {
  moduleRegistry.registerModule(type, component);
}