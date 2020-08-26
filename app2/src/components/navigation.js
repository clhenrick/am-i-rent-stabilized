export function navigationMenuToggle() {
  const navIcon = document.querySelector(".burger");
  const mainNavList = document.querySelector(".main-nav ul");
  navIcon.addEventListener("click", function (e) {
    e.preventDefault();
    navIcon.classList.toggle("open");
    mainNavList.classList.toggle("responsive");
  });
}
