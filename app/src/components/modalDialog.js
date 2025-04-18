import { Component } from "./_componentBase";

/** does the user not care if animations are enabled on their device? */
const reduceMotionNoPreference = window.matchMedia(
  "prefers-reduced-motion: no-preference"
);

/** handles modal dialogs for the tenants rights and rent history modals */
export class ModalDialog extends Component {
  constructor(props) {
    super(props);
  }

  init(props) {
    if ("trigger" in props && props.trigger instanceof HTMLElement) {
      /** @type {HTMLButtonElement} */
      this.trigger = props.trigger;
    }

    /** @type {HTMLDialogElement} */
    this.dialog = this._element;

    /** @type {HTMLButtonElement} */
    this.closeButton = this._element.querySelector("button.modal--close");

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLightDismiss = this.handleLightDismiss.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);

    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("keydown", this.handleKeyDown);
    this.closeButton.addEventListener("click", this.handleClose);
    this.trigger.addEventListener("click", this.handleOpen);
    this.dialog.addEventListener("click", this.handleLightDismiss);
  }

  removeEvents() {
    document.removeEventListener("keydown", this.handleKeyDown);
    this.closeButton.removeEventListener("click", this.handleClose);
    this.trigger.removeEventListener("click", this.handleOpen);
    this.dialog.removeEventListener("click", this.handleLightDismiss);
  }

  handleKeyDown(event) {
    if (event.code === "Escape") {
      event.preventDefault();
      this.handleClose();
    }
  }

  /**
   * handles closing the modal when clicking outside of its content / on the backdrop
   * @param {Event} event
   */
  handleLightDismiss(event) {
    if (event.target === event.currentTarget) {
      this.handleClose();
    }
  }

  /**
   * closes the dialog with an animation if the user has no reduced motion preference, otherwise closes without animation
   */
  handleClose() {
    if (reduceMotionNoPreference.matches) {
      this.dialog
        .animate([{ opacity: 0 }], { duration: 500 })
        .finished.then((animation) => {
          animation.commitStyles();
          this.dialog.close();
        });
    } else {
      this.dialog.close();
    }
  }

  /**
   * safely opens (without throwing) the dialog as a modal dialog
   */
  handleOpen() {
    if (!this.dialog.open) {
      // in case close animation sets `opacity:0` on `dialog.style`
      this.dialog.style.opacity = 1;
      this.dialog.showModal();
    }
  }
}
