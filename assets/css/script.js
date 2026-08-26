// ===============================
// PORTFOLIO JAVASCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // SMOOTH SCROLLING
    // ===============================

    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // ===============================
    // ACTIVE NAVIGATION LINK
    // ===============================

    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", function () {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    });


    // ===============================
    // PROJECT CARD HOVER EFFECT
    // ===============================

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {

        card.addEventListener("mouseenter", function () {
            this.classList.add("project-hover");
        });

        card.addEventListener("mouseleave", function () {
            this.classList.remove("project-hover");
        });

    });


    // ===============================
    // CURRENT YEAR IN FOOTER
    // ===============================

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});