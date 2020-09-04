import { Component } from "./_componentBase";

export function navigationMenuToggle() {
  const navIcon = document.querySelector(".burger");
  const mainNavList = document.querySelector(".main-nav ul");
  navIcon.addEventListener("click", function (e) {
    e.preventDefault();
    navIcon.classList.toggle("open");
    mainNavList.classList.toggle("responsive");
  });
}

export class NavMenuToggle extends Component {
  constructor() {
    super({ element: document.querySelector("nav.main-nav") });
  }

  init() {
    this.handleClick = this.handleClick.bind(this);
  }

  bindEvents() {
    this.element
      .querySelector(".burger")
      .addEventListener("click", this.handleClick);
  }

  removeEvents() {
    this.element
      .querySelector(".burger")
      .removeEventListener("click", this.handleClick);
  }

  handleClick(event) {
    event.preventDefault();
    this.element.querySelector(".burger").classList.toggle("open");
    this.element.querySelector("ul").classList.toggle("responsive");
  }
}
