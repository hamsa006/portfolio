
// ===== MOBILE NAVIGATION =====
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuBtn.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';

        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
    "section, .project-card, .skill-card, .timeline-item"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("show");
    });
}

// ===== ACTIVE NAVIGATION LINK =====
const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navigationLinks.forEach(link => {
        link.classList.remove("active");

        const linkTarget = link.getAttribute("href");

        if (linkTarget === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// ===== SOCIAL LINKS: OPEN EXTERNAL PROFILES =====
document.querySelectorAll(".social-icons a").forEach(link => {
    const href = link.getAttribute("href");

    if (
        href &&
        href !== "#" &&
        !href.includes("YOUR_USERNAME") &&
        !href.includes("YOUR_LINKEDIN") &&
        !href.includes("YOUR_APNA")
    ) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    }
});

// ===== CURRENT YEAR IN FOOTER =====
const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ===== BACK TO TOP BUTTON (OPTIONAL) =====
const backToTop = document.querySelector("#backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.style.display =
            window.scrollY > 400 ? "inline-flex" : "none";
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
