import { store } from "../store";
import { ComponentRegistry } from "./componentRegistry";
import { NavMenuToggle } from "../components/navigation";
import { LanguageToggle } from "../components/languageToggle";
import { AdvanceSlides } from "../components/advanceSlides";
import { SlidesContainer } from "../components/slidesContainer";
import { KeyboardNavigation } from "../components/keyboardNavigation";
import { AddressSearchForm } from "../components/addressSearchForm";
import { ProgressIndicator } from "../components/progressIndicator";
import { VerifyRentStabilized } from "../components/verifyRentStabilized";
import { SearchResultMap } from "../components/searchResultMap";
import { AddToCalendar } from "../components/addToCalendar";
import { StartOver } from "../components/startOver";
import { TenantsRightsGroups } from "../components/tenantsRightsGroups";
import { initLang } from "./translate";
import { ModalDialog } from "../components/modalDialog";

const registry = new ComponentRegistry();

export default function initApp() {
  // set the page's language / locale
  initLang();

  // safely remove previous components
  registry.removeAll();

  // enables slides keyboard navigation for debugging
  if (process.env.NODE_ENV === "development") {
    registry.add(
      "keyboardNavigation",
      new KeyboardNavigation({
        element: document.body,
        store,
      })
    );
  }

  // top nav menu's hamburger icon
  registry.add(
    "navMenuToggle",
    new NavMenuToggle({ element: document.querySelector("nav.main-nav") })
  );

  // language toggle btns desktop
  registry.add(
    "languageToggle",
    new LanguageToggle({
      element: document.querySelector("aside.desktop > .lang-toggle"),
      store,
    })
  );

  // language toggle btns mobile
  registry.add(
    "languageToggleMobile",
    new LanguageToggle({
      element: document.querySelector("aside.mobile > .lang-toggle"),
      store,
    })
  );

  // lefthand progress circles
  registry.add(
    "progressIndicator",
    new ProgressIndicator({
      element: document.getElementById("progress-indicator"),
      store,
    })
  );

  // handles slide scrolling
  registry.add(
    "slidesContainer",
    new SlidesContainer({
      element: document.querySelector(".slides"),
      store,
    })
  );

  // "next" slide advance buttons
  document.querySelectorAll(".button--go-next").forEach((element, idx) => {
    registry.add(`advanceSlides${idx}`, new AdvanceSlides({ element, store }));
  });

  // handles advancing to "when you receive your rent history"
  registry.add(
    "goToRentHistory",
    new AdvanceSlides({
      element: document.querySelector("p.go-step4"),
      store,
      advanceToIdx: 6,
    })
  );

  // address search form & geocoding of address input
  registry.add(
    "addressSearchForm",
    new AddressSearchForm({
      element: document.querySelector("#address-form"),
      store,
    })
  );

  // toggle yes/no message for rent stabilized result
  registry.add(
    "verifyRentStabilized",
    new VerifyRentStabilized({
      element: document.getElementById("slide-4"),
      store,
    })
  );

  registry.add(
    "searchResultMap",
    new SearchResultMap({
      element: document.getElementById("map"),
      store,
    })
  );

  registry.add(
    "startOver",
    new StartOver({
      element: document.querySelector("button.start-over"),
      store,
    })
  );

  registry.add(
    "tenantsRightsGroups",
    new TenantsRightsGroups({
      element: document.querySelector(
        "dialog.modal--tenants-rights .modal--content"
      ),
      store,
    })
  );

  registry.add(
    "modalDialogTenantsRightsGroups",
    new ModalDialog({
      element: document.querySelector("dialog.modal--tenants-rights"),
      trigger: document.querySelector(".js-tr-modal-trigger"),
    })
  );

  registry.add(
    "modalDialogRentHistory",
    new ModalDialog({
      element: document.querySelector("dialog.modal--rent-history"),
      trigger: document.querySelector(".js-rh-modal-trigger"),
    })
  );

  // NOTE: instantiate this component last as it does something async which sometimes prevents components instantiated after it from initializing correctly
  registry.add(
    "addToCalendar",
    new AddToCalendar({
      element: document.querySelector(".atc-container"),
    })
  );
}
