import initInfoPages from "./utils/initInfoPages.js";

document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    initInfoPages();
  }
};
