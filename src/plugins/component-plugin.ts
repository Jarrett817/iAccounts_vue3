import * as components from "@/components";
import { App } from "vue";

type Key = keyof typeof components;
export const componentPlugin = {
  install: (app: App) => {
    for (const key in components) {
      app.component(key, components[key as Key]);
    }
  }
};
