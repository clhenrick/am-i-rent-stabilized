import { store } from "../store";
import { ComponentRegistry } from "./componentRegistry";
import { NavMenuToggle } from "../components/navigation";
import { LanguageToggle } from "../components/languageToggle";
import { initLang } from "./translate";

const registry = new ComponentRegistry();

export default function initInfoPages() {
  initLang();

  registry.removeAll();

  registry.add(
    "navMenuToggle",
    new NavMenuToggle({ element: document.querySelector("nav.main-nav") })
  );

  registry.add(
    "languageToggle",
    new LanguageToggle({
      element: document.querySelector("div.lang-toggle"),
      store,
    })
  );
}
