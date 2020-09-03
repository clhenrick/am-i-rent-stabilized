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
    super();
    this.navIcon = document.querySelector(".burger");
    this.mainNavList = document.querySelector(".main-nav ul");
    this.handleClick = this.handleClick.bind(this);
  }

  bindEvents() {
    this.navIcon.addEventListener("click", this.handleClick);
  }

  removeEvents() {
    this.navIcon.removeEventListener("click", this.handleClick);
  }

  handleClick(event) {
    event.preventDefault();
    this.navIcon.classList.toggle("open");
    this.mainNavList.classList.toggle("responsive");
  }
}
