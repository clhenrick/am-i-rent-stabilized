import initInfoPages from './utils/initInfoPages';

document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    initInfoPages();
  }
};
