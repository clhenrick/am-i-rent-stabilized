import "./scss/main.scss";
import { langToggle } from "./utils/translate";
import { navigationMenuToggle } from "./components/navigation";

console.log("infoPages entry");

// FIXME: navigationMenuToggle is only called once,
// if language changes it needs to be called again.
langToggle(navigationMenuToggle);
