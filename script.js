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

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");