import "innersvg-polyfill";
import initApp from "./utils/initApp";

document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    initApp();
  }
};
