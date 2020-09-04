import "./scss/main.scss";
import { langToggle } from "./utils/translate";
import { NavMenuToggle } from "./components/navigation";
import { LanguageToggle } from "./components/languageToggle";

console.log("infoPages entry");

function init() {
  const navMenuToggle = new NavMenuToggle();
  const languageToggle = new LanguageToggle();
}

// FIXME: navigationMenuToggle is only called once,
// if language changes it needs to be called again.
langToggle(init);
