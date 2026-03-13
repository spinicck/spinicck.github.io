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
    /* Only trigger toggle event if screen size is smaller than 1000px */
    if (!matchMedia("(max-width: 1000px)").matches) {
        return;
    }
    navbar.classList.toggle("compact")
    navToggleIcon.classList.toggle("fa-bars")
    navToggleIcon.classList.toggle("fa-x")
}

/**
 * Function to switch between light and dark theme.
 */
function toggleLightDarkMode() {
    const hmtlTag = document.getElementsByTagName("html")[0];
    const navThemeIcon = document.getElementById("nav-theme-icon")
    navThemeIcon.classList.toggle("fa-sun")
    navThemeIcon.classList.toggle("fa-moon")
    if (hmtlTag.className === "light") {
        hmtlTag.className = "dark"
    } else {
        hmtlTag.className = "light"
    }
}

/**
 * Trigger animation opening a card and a modal.
 * Set the global variables `currentOpenedCard` and `currentOpenedModal`.
 * @param {ExpandCard} e card element node
 * @param {string} mid card modal id
 */
async function openCard(e, mid) {
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
    /* Make animation for card opening */
    let animation = await currentOpenedCard.animate(
        {
            transform: `translate(${transVectX}px, ${transVectY}px) scale(1.5)`,
            filter: "blur(15px)",
        },
        { duration: 100, fill: "forwards" }
    ).finished
    animation.commitStyles()
    animation.cancel()
    /* Make modal */
    currentOpenedModal = document.querySelector(`#${mid}`)
    currentOpenedModal.style.display = "flex"
    currentOpenedModal.onclick = closeModal
    /* Animate modal opening */
    animation = await currentOpenedModal.animate(
        [
            { filter: "blur(15px)", opacity: 0, transform: "scale(0.4)" },
            { filter: "blur(0px)", opacity: 1, transform: "scale(1)" }
        ],
        { duration: 100, fill: "forwards" }
    ).finished
    animation.commitStyles()
    animation.cancel()
}

/**
 * Function that animate the modal closing, and expanded card minimizing.
 * Reset the 'currentOpenedCard' and 'currentOpenedModal' global variables.
 */
async function closeModal() {
    /* Animation modal closing */
    let animation = await currentOpenedModal.animate(
        [
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0, transform: "scale(0)" }
        ],
        { duration: 100, fill: "forwards" }
    ).finished
    animation.commitStyles()
    animation.cancel()
    /* Hide modal and remove from DOM */
    currentOpenedModal.style.display = "none"
    currentOpenedModal = null
    /* Animate card minimizing */
    animation = await currentOpenedCard.animate(
        { 
            transform: "translate(0) scale(1)",
            filter: "blur(0px)",
        },
        { duration: 100, fill: "forwards" }
    ).finished
    animation.commitStyles()
    animation.cancel()
    /* Empty current Opened card */
    currentOpenedCard = null
}

/**
 * Class to make reusable regular card components
 */
class RegularCard extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("regular-card");
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
}

/**
 * Class to make reusable expandable card components
 */
class ExpandCard extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("expand-card");
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
}

/**
 * Class to make reusable modal card.
 */
class ModalCard extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById("modal-card");
        let templateContent = template.content;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
}
/* Define simple card html-tag */
customElements.define("regular-card", RegularCard, );
customElements.define("expand-card", ExpandCard, );
customElements.define("modal-card", ModalCard, );