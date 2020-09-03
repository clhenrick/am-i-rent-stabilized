import "./scss/main.scss";
import { langToggle } from "./utils/translate";
import { NavMenuToggle } from "./components/navigation";

console.log("infoPages entry");

function init() {
  const navMenuToggle = new NavMenuToggle();
  navMenuToggle.bindEvents();
}

// FIXME: navigationMenuToggle is only called once,
// if language changes it needs to be called again.
langToggle(init);
