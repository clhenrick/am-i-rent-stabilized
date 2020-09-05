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
  constructor(props) {
    super(props);
  }

  init() {
    this.handleClick = this.handleClick.bind(this);
    this.bindEvents();
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
