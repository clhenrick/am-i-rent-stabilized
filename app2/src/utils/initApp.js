import { NavMenuToggle } from "../components/navigation";
import { LanguageToggle } from "../components/languageToggle";

export default function initApp() {
  new NavMenuToggle({ element: document.querySelector("nav.main-nav") });
  new LanguageToggle({
    element: document.querySelector("div.lang-toggle.desktop"),
  });
  new LanguageToggle({
    element: document.querySelector("div.lang-toggle.mobile"),
  });
}
