export function navigationMenuToggle() {
  const navIcon = document.querySelector(".burger");
  const mainNavList = document.querySelector(".main-nav ul");
  navIcon.addEventListener("click", function (e) {
    e.preventDefault();
    navIcon.classList.toggle("open");
    mainNavList.classList.toggle("responsive");
  });
}

export class NavMenuToggle {
  constructor() {
    this.navIcon = document.querySelector(".burger");
    this.mainNavList = document.querySelector(".main-nav ul");
    this.bindEvents = this.bindEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  bindEvents() {
    console.log(this.bindEvents);
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
