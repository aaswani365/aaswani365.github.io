// ==========================================
// AKSHAY ASWANI PORTFOLIO
// Main JavaScript
// File: assets/js/script.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const menuButton = document.querySelector(".menu-btn");
    const navigation = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );
    const sections = document.querySelectorAll(
        "main section[id]"
    );
    const revealElements = document.querySelectorAll(
        ".reveal"
    );
    const yearElement = document.getElementById("year");


    // ==========================================
    // MOBILE NAVIGATION
    // ==========================================

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {

            navigation.classList.toggle("open");

            const isOpen =
                navigation.classList.contains("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

        });

    }


    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            const targetSection =
                document.querySelector(targetId);


            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }


            // Close mobile menu after clicking
            if (navigation) {
                navigation.classList.remove("open");
            }


            if (menuButton) {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        });

    });


    // ==========================================
    // REVEAL ANIMATION
    // ==========================================

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    }

    else {

        // Fallback for older browsers

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    // ==========================================
    // ACTIVE NAVIGATION
    // ==========================================

    const updateActiveNavigation = () => {

        const scrollPosition =
            window.scrollY + 180;


        // Detect bottom of page
        const pageBottom =
            window.innerHeight +
            window.scrollY >=
            document.documentElement.scrollHeight - 10;


        let currentSection = "";


        // ======================================
        // CONTACT SECTION FIX
        // ======================================

        // Contact is the last section.
        // Because the browser cannot always
        // scroll Contact to the top of the page,
        // force Contact active at page bottom.

        if (pageBottom) {

            currentSection = "contact";

        }

        else {

            sections.forEach((section) => {

                if (
                    scrollPosition >=
                    section.offsetTop
                ) {

                    currentSection =
                        section.id;

                }

            });

        }


        // ======================================
        // APPLY ACTIVE CLASS
        // ======================================

        navLinks.forEach((link) => {

            const target =
                link.getAttribute("href");


            if (
                target ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

            else {

                link.classList.remove("active");

            }

        });

    };


    // Run active-navigation logic
    // whenever the page scrolls

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    // Run once when page loads

    updateActiveNavigation();


    // ==========================================
    // CURRENT YEAR
    // ==========================================

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

});