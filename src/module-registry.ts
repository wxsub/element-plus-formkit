import { type Component } from 'vue';
import { Modules as BuiltInModules } from '@/asyncModulesLoader';

export type CustomModuleRegistry = FormkitModules

class FormkitModules {
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

export const modules = new FormkitModules();

export function registerModule(type: string, component: Component) {
  modules.registerModule(type, component);
}