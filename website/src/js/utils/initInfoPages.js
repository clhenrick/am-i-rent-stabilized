import { ComponentRegistry } from "./componentRegistry.js";
import { NavMenuToggle } from "../components/navigation.js";

const registry = new ComponentRegistry();

export default function initInfoPages() {
  registry.removeAll();

  registry.add(
    "navMenuToggle",
    new NavMenuToggle({ element: document.querySelector("nav.main-nav") })
  );
}
