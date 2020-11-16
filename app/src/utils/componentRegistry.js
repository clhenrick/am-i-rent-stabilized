import { Component } from "../components/_componentBase";

export class ComponentRegistry {
  constructor() {
    this._registry = new Map();
  }

  add(name, component) {
    if (!name) {
      throw "requires a name / key";
    }

    if (!component || !(component instanceof Component)) {
      throw "requires component to be a Component instance";
    }

    this.registry.set(name, component);
  }

  get(name) {
    return this.registry.get(name);
  }

  remove(name) {
    if (this.registry.has(name)) {
      this.registry.get(name).cleanUp();
      this.registry.delete(name);
    }
  }

  removeAll() {
    if (this.size > 0) {
      this.registry.forEach((_component, name) => {
        this.remove(name);
      });
    }
  }

  get size() {
    return this.registry.size;
  }

  get registry() {
    return this._registry;
  }
}
