import { ComponentRegistry } from "./componentRegistry";
import { NavMenuToggle } from "../components/navigation";

const registry = new ComponentRegistry();

export default function initInfoPages() {
  registry.removeAll();

  registry.add(
    "navMenuToggle",
    new NavMenuToggle({ element: document.querySelector("nav.main-nav") })
  );
}
