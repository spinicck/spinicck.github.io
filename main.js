/** =============================================================================
 * Main script for interactive website.
 * Author: Kévin SPINICCI
 * Data: 2025-09-18
 ============================================================================= */

var currentOpenedCard = null
var currentOpenedModal = null

/**
 * Observer to animate element appearances on screen
 */
const showOnScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.toggle("show")
        } else {
            entry.target.classList.toggle("show")
        }
    });
})

/* Get elements with scroll animation and add observer. */
const showOnScrollElements = document.querySelectorAll(".show-on-scroll.hidden")
showOnScrollElements.forEach((el) => showOnScrollObserver.observe(el));

/**
 * Show/hide the navbar when the navbar toggle button is pressed.
 * Hide the navbar when an element is pressed.
 * @returns void
 */
function toggleNavbar() {
    var navbar = document.getElementById("nav-bar");
    var navToggleIcon = document.getElementById("nav-toggle-icon");
    /* Only trigger toggle event if screen size is smaller than 800px */
    if (!matchMedia("(max-width: 800px)").matches) {
        return;
    }
    if (navbar.classList.contains("compact")) {
        navToggleIcon.innerHTML = "menu"
    } else {
        navToggleIcon.innerHTML = "close"
    }
    navbar.classList.toggle("compact")
}

/**
 * Function to switch between light and dark theme.
 */
function toggleLightDarkMode() {
    const hmtlTag = document.getElementsByTagName("html")[0];
    const navThemeIcon = document.getElementById("nav-theme-icon")
    if (hmtlTag.className === "light") {
        hmtlTag.className = "dark"
        navThemeIcon.innerHTML = "dark_mode"
    } else {
        hmtlTag.className = "light"
        navThemeIcon.innerHTML = "light_mode"
    }
}

async function openCard(e) {
    console.debug("Call openCard: ", e)
    currentOpenedCard = e
    /* Compute center of viewport */
    let centerX = window.innerWidth / 2
    let centerY = window.innerHeight / 2
    /* Compute center of current element */
    let bbox = currentOpenedCard.getBoundingClientRect()
    let coordX = bbox.x + (bbox.width / 2)
    let coordY = bbox.y + (bbox.height / 2)
    /* Compute translation vector */
    let transVectX = centerX - coordX
    let transVectY = centerY - coordY
    let animation = await currentOpenedCard.animate(
        { transform: `translate(${transVectX}px, ${transVectY}px)` },
        { duration: 400, fill: "forwards" }
    ).finished
    animation.commitStyles()
    animation.cancel()
    currentOpenedModal = currentOpenedCard.getElementsByTagName("modal-content")[0].cloneNode(true)
    currentOpenedModal.style.display = "flex"
    currentOpenedModal.onclick = closeModal
    document.body.appendChild(currentOpenedModal)
    animation = await currentOpenedModal.animate(
        [
            { opacity: 0, transform: "scale(0)" },
            { opacity: 1, transform: "scale(1)" }
        ],
        { duration: 400, fill: "forwards" }
    ).finished
    animation.commitStyles()
    animation.cancel()
}

async function closeModal() {
    console.debug("Close Modal")
    let animation = await currentOpenedModal.animate(
        [
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0, transform: "scale(0)" }
        ],
        { duration: 400, fill: "forwards" }
    ).finished
    animation.commitStyles()
    animation.cancel()
    currentOpenedModal.style.display = "none"
    currentOpenedModal.remove()
    currentOpenedModal = null

    animation = await currentOpenedCard.animate(
        { transform: "translate(0)" },
        { duration: 400, fill: "forwards" }
    ).finished
    animation.commitStyles()
    animation.cancel()
    currentOpenedCard = null
}