let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};
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
const posts = [
  {
    imgSrc: "../assets/images/software-development.jpg",
    title: "Power of Custom Software",
    category: "software",

    text: "Kefita Technology has been at the forefront of this transformation",
    link: "Custom-Software.html",
  },

  {
    imgSrc: "../assets/images/IOT.jpg",
    title: "Embracing the IoT Revolution",
    category: "consultancy",
    text: " Kefita has been at the forefront of this technological revolution",
    link: "Custom-Software.html",
  },

  {
    imgSrc: "../assets/images/IT-Consultancy.jpg",
    title: "The Future of IT Consulting",
    category: "consultancy",
    text: "Kefita's empowers its clients to make informed decisions",
    link: "Custom-Software.html",
  },

  {
    imgSrc: "../assets/images/gps-road.jpeg",
    title: "Revolutionizing Road Safety",
    category: "gps",

    text: "Kefita has emerged as a beacon of innovations",
    link: "Custom-Software.html",
  },

  {
    imgSrc: "../assets/images/agile.jpg",
    title: "Agile Methodology",
    category: "software",
    text: "Kefita has empowered their teams to deliver innovative solutions",
    link: "Custom-Software.html",
  },

  {
    imgSrc: "../assets/images/gps-tracking.jpg",
    title: "Fleet Management Solutions",
    category: "gps",

    text: "Kefita Technology has developed a fleet management solutions",
    link: "Custom-Software.html",
  },
];
const cardContainer = document.getElementById("cardsContainer");
const renderCard = (posts, isFiltered) => {
  cardContainer.innerHTML = posts
    .map(
      (post) =>
        `    <div class="box" data-name="${post.category}">
            <div class="image">
          <img src="${post.imgSrc}" alt="${post.title}" />
        </div>
        <div class="box-content">
          <h4>${post.title}</h4>
          <p>
          ${post.text}
          </p>

          <button onclick="window.location.href='${post.link}'" class="readmore">Read more</button>
        </div>
      </div>
      `
    )
    .join(" ");
  if (isFiltered) {
    cardContainer.classList.add("filtered");
  } else {
    cardContainer.classList.remove("filtered");
  }
};
const filterButtons = document.querySelectorAll(".filerButton button");
const filtercard = (e) => {
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");
  const filter = e.target.dataset.name;

  const filteredPosts =
    filter === "show-all"
      ? posts
      : posts.filter((post) => post.category === filter);
  renderCard(filteredPosts, filter !== "show-all");
};

filterButtons.forEach((button) => button.addEventListener("click", filtercard));

// Initial render
renderCard(posts, false);
