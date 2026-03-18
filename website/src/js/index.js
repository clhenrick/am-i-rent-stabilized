import "innersvg-polyfill";
import initApp from "./utils/initApp.js";

document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    initApp();
  }
};
