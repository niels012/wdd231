const hamMenuIcon = document.getElementById("ham-menu");
const navBar = document.getElementById("nav-bar");
const navLinks = navBar.querySelectorAll("a");

// Toggle mobile nav
hamMenuIcon.addEventListener("click", () => {
  navBar.classList.toggle("active");
  hamMenuIcon.classList.toggle("fa-times");
});

// Close menu and set active on click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navBar.classList.remove("active");
    hamMenuIcon.classList.remove("fa-times");
    setActiveLink(link);
  });
});

// Set active link manually
function setActiveLink(activeLink) {
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  activeLink.classList.add("active");
}

// Highlight active link based on <title> and link's data-name attribute
function highlightLinkByTitle() {
  const pageTitle = document.title.trim().toLowerCase();
  console.log("Page Title:", pageTitle);

  navLinks.forEach((link) => {
    const linkTitle = link.dataset.name?.trim().toLowerCase();
    console.log("Link Title:", linkTitle);

    if (linkTitle === pageTitle) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Call it on page load
highlightLinkByTitle();
