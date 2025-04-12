document.addEventListener("DOMContentLoaded", () => {
    const hamMenuIcon = document.getElementById("ham-menu");
    const navBar = document.getElementById("nav-bar");
    const navLinks = navBar.querySelectorAll("a");
  
    // Toggle mobile nav
    hamMenuIcon.addEventListener("click", () => {
      navBar.classList.toggle("active");
      hamMenuIcon.classList.toggle("fa-times");
    });
  
    // Close menu on click and manually activate
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navBar.classList.remove("active");
        hamMenuIcon.classList.remove("fa-times");
      });
    });
  
    // Highlight current link based on <title>
    function highlightLinkByTitle() {
      const pageTitle = document.title.trim().toLowerCase();
      navLinks.forEach((link) => {
        const linkTitle = link.dataset.name?.trim().toLowerCase();
        if (linkTitle === pageTitle) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  
    highlightLinkByTitle();
  });
  
// Call it on page load

