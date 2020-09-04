import { NavMenuToggle } from "../components/navigation";
import { LanguageToggle } from "../components/languageToggle";

export default function initApp() {
  new NavMenuToggle();
  new LanguageToggle();
}
