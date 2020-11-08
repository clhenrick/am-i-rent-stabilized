import { store } from "../store";
import { NavMenuToggle } from "../components/navigation";
import { LanguageToggle } from "../components/languageToggle";
import { AdvanceSlides } from "../components/advanceSlides";
import { SlidesContainer } from "../components/slidesContainer";
import { KeyboardNavigation } from "../components/keyboardNavigation";
import { AddressSearchForm } from "../components/addressSearchForm";
import { ProgressIndicator } from "../components/progressIndicator";
import { VerifyRentStabilized } from "../components/verifyRentStabilized";
import { SearchResultMap } from "../components/searchResultMap";
import { RentHistoryEmail } from "../components/rentHistoryEmail";
import { AddToCalendar } from "../components/addToCalendar";
import { StartOver } from "../components/startOver";

// prevents KeyboardNavigation from being added multiple times
// when page's language is toggled
let keyNavEnabled = false;

export default function initApp() {
  // enables slides keyboard navigation for debugging
  if (process.env.NODE_ENV !== "production" && !keyNavEnabled) {
    new KeyboardNavigation({
      element: document.body,
      store,
    });
    keyNavEnabled = true;
  }

  // top nav menu's hamburger icon
  new NavMenuToggle({ element: document.querySelector("nav.main-nav") });

  // language toggle btns desktop
  new LanguageToggle({
    element: document.querySelector("div.desktop > div.lang-toggle"),
    store,
  });

  // language toggle btns mobile
  new LanguageToggle({
    element: document.querySelector("div.mobile > div.lang-toggle"),
    store,
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
    new AdvanceSlides({ element, store, buttonSelector: "h3" });
  });

  // handles advancing to "when you receive your rent history"
  new AdvanceSlides({
    element: document.querySelector("p.go-step4"),
    store,
    buttonSelector: "a",
    advanceToIdx: 6,
  });

  // address search form & geocoding of address input
  new AddressSearchForm({
    element: document.querySelector("#address-form"),
    store,
  });

  // toggle yes/no message for rent stabilized result
  new VerifyRentStabilized({
    element: document.getElementById("slide-4"),
    store,
  });

  new SearchResultMap({
    element: document.getElementById("map"),
    store,
  });

  new RentHistoryEmail({
    element: document.getElementById("mail-to"),
  });

  new AddToCalendar({
    element: document.querySelector(".atc-container"),
  });

  new StartOver({
    element: document.querySelector(".button.start-over"),
    store,
  });
}
