import { NavMenuToggle } from "../components/navigation";
import { LanguageToggle } from "../components/languageToggle";
import { AdvanceSlides } from "../components/advanceSlides";

export default function initApp() {
  // nav menu hamburger icon
  new NavMenuToggle({ element: document.querySelector("nav.main-nav") });

  // language toggle desktop & mobile
  new LanguageToggle({
    element: document.querySelector("div.desktop > div.lang-toggle"),
  });
  new LanguageToggle({
    element: document.querySelector("div.mobile > div.lang-toggle"),
  });

  // slide advance buttons
  document.querySelectorAll(".go-next.bottom-arrow").forEach((element) => {
    new AdvanceSlides({ element });
  });
}
