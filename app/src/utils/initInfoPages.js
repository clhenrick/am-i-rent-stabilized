import { store } from "../store";
import { NavMenuToggle } from "../components/navigation";
import { LanguageToggle } from "../components/languageToggle";

export default function initInfoPages() {
  new NavMenuToggle({ element: document.querySelector("nav.main-nav") });
  new LanguageToggle({
    element: document.querySelector("div.lang-toggle"),
    store,
  });
}
