import { NavMenuToggle } from "../components/navigation";
import { LanguageToggle } from "../components/languageToggle";
import { AdvanceSlides } from "../components/advanceSlides";
import { SlidesContainer } from "../components/slidesContainer";

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

  new SlidesContainer({
    element: document.querySelector(".slides-container"),
  });

  // slide advance buttons
  document.querySelectorAll(".go-next.bottom-arrow").forEach((element) => {
    new AdvanceSlides({ element, buttonSelector: "h3" });
  });

  // go to slide 4
  new AdvanceSlides({
    element: document.querySelector("p.go-step4"),
    buttonSelector: "a",
    advanceToIdx: 6,
  });
}
