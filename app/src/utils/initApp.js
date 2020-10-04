import { store } from "../store";
import { NavMenuToggle } from "../components/navigation";
import { LanguageToggle } from "../components/languageToggle";
import { AdvanceSlides } from "../components/advanceSlides";
import { SlidesContainer } from "../components/slidesContainer";
import { KeyboardNavigation } from "../components/keyboardNavigation";
import { AddressSearchForm } from "../components/addressSearchForm";
import { ProgressIndicator } from "../components/progressIndicator";

export default function initApp() {
  if (process.env.NODE_ENV !== "production") {
    // enables slides keyboard navigation for debugging
    new KeyboardNavigation({
      element: document.body,
    });
  }

  // top nav menu's hamburger icon
  new NavMenuToggle({ element: document.querySelector("nav.main-nav") });

  // language toggle btns desktop
  new LanguageToggle({
    element: document.querySelector("div.desktop > div.lang-toggle"),
  });

  // language toggle btns mobile
  new LanguageToggle({
    element: document.querySelector("div.mobile > div.lang-toggle"),
  });

  // lefthand progress circles
  new ProgressIndicator({
    element: document.getElementById("progress-indicator"),
    store,
  });

  // handles slide scrolling
  new SlidesContainer({
    element: document.querySelector(".slides-container"),
    store,
  });

  // "next" slide advance buttons
  document.querySelectorAll(".go-next.bottom-arrow").forEach((element) => {
    new AdvanceSlides({ element, buttonSelector: "h3" });
  });

  // handles advancing to "when you receive your rent history"
  new AdvanceSlides({
    element: document.querySelector("p.go-step4"),
    buttonSelector: "a",
    advanceToIdx: 6,
  });

  // address search form & geocoding of address input
  new AddressSearchForm({
    element: document.querySelector("#address-form"),
    store,
  });
}
