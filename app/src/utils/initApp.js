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

export const registry = new Map();

export function addToRegistry(name, component) {
  if (registry.has(name)) {
    registry.get(name).cleanUp();
    registry.delete(name);
  }
  registry.set(name, component);
}

export default function initApp() {
  // enables slides keyboard navigation for debugging
  if (process.env.NODE_ENV !== "production") {
    addToRegistry(
      "keyboardNavigation",
      new KeyboardNavigation({
        element: document.body,
        store,
      })
    );
  }

  // top nav menu's hamburger icon
  addToRegistry(
    "navMenuToggle",
    new NavMenuToggle({ element: document.querySelector("nav.main-nav") })
  );

  // language toggle btns desktop
  addToRegistry(
    "languageToggle",
    new LanguageToggle({
      element: document.querySelector("div.desktop > div.lang-toggle"),
      store,
    })
  );

  // language toggle btns mobile
  addToRegistry(
    "languageToggleMobile",
    new LanguageToggle({
      element: document.querySelector("div.mobile > div.lang-toggle"),
      store,
    })
  );

  // lefthand progress circles
  addToRegistry(
    "progressIndicator",
    new ProgressIndicator({
      element: document.getElementById("progress-indicator"),
      store,
    })
  );

  // handles slide scrolling
  addToRegistry(
    "slidesContainer",
    new SlidesContainer({
      element: document.querySelector(".slides-container"),
      store,
    })
  );

  // "next" slide advance buttons
  document.querySelectorAll(".go-next.bottom-arrow").forEach((element, idx) => {
    addToRegistry(
      `advanceSlides${idx}`,
      new AdvanceSlides({ element, store, buttonSelector: "h3" })
    );
  });

  // handles advancing to "when you receive your rent history"
  addToRegistry(
    "goToRentHistory",
    new AdvanceSlides({
      element: document.querySelector("p.go-step4"),
      store,
      buttonSelector: "a",
      advanceToIdx: 6,
    })
  );

  // address search form & geocoding of address input
  addToRegistry(
    "addressSearchForm",
    new AddressSearchForm({
      element: document.querySelector("#address-form"),
      store,
    })
  );

  // toggle yes/no message for rent stabilized result
  addToRegistry(
    "verifyRentStabilized",
    new VerifyRentStabilized({
      element: document.getElementById("slide-4"),
      store,
    })
  );

  addToRegistry(
    "searchResultMap",
    new SearchResultMap({
      element: document.getElementById("map"),
      store,
    })
  );

  addToRegistry(
    "rentHistoryEmail",
    new RentHistoryEmail({
      element: document.getElementById("mail-to"),
    })
  );

  addToRegistry(
    "addToCalendar",
    new AddToCalendar({
      element: document.querySelector(".atc-container"),
    })
  );

  addToRegistry(
    "startOver",
    new StartOver({
      element: document.querySelector(".button.start-over"),
      store,
    })
  );
}
