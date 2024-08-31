// Get the current page URL
const currentPage = window.location.pathname.split("/").pop();

// Get all navigation links
const navLinks = document.querySelectorAll(".navlist a");

// Loop through each link
navLinks.forEach((link) => {
  // Check if the link's href matches the current page
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
const showMoreButton = document.querySelector(".show-more");
const itemsContainer = document.querySelector(".items");
const items = document.querySelectorAll(".box");
const servicePerColumn = 3;
let visibleService = servicePerColumn;
items.forEach((item, index) => {
  if (index >= visibleService) {
    item.style.display = "none";
  }
});
function expandService() {
  visibleService += servicePerColumn;
  items.forEach((item, index) => {
    if (index < visibleService) {
      item.style.display = "block";
    }
  });
  if (visibleService >= items.length) {
    showMoreButton.style.display = "none";
  }
}
let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};
