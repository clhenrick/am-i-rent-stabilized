/*jshint esversion: 6 */
import "./scss/main.scss";
import { langToggle } from "./utils/translate";
import { navigationMenuToggle } from "./components/navigation";

console.log("index entry");

langToggle(handleContentLoaded);

function handleContentLoaded() {
  navigationMenuToggle();
}
