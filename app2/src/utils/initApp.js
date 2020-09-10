import { NavMenuToggle } from "../components/navigation";
import { LanguageToggle } from "../components/languageToggle";

export default function initApp() {
  new NavMenuToggle({ element: document.querySelector("nav.main-nav") });
  new LanguageToggle({
    element: document.querySelector("div.desktop > div.lang-toggle"),
  });
  new LanguageToggle({
    element: document.querySelector("div.mobile > div.lang-toggle"),
  });
}
