/** =============================================================================
 * Main script for interactive website.
 * Author: Kévin SPINICCI
 * Data: 2025-09-18
 ============================================================================= */

var currentOpenedCard = null
var currentOpenedModal = null

/**
 * Show/hide the navbar when the navbar toggle button is pressed.
 * Hide the navbar when an element is pressed.
 * @returns void
 */
function toggleNavbar() {
    var navbarOverlay = document.getElementById("nav-overlay");
    var navToggleIcon = document.getElementById("nav-toggle-icon");
    /* Only trigger toggle event if screen size is smaller than 1000px */
    if (!matchMedia("(max-width: 1000px)").matches) {
        return;
    }
    navbarOverlay.classList.toggle("show-overlay")
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
    currentOpenedCard.classList.toggle("collapse")
    currentOpenedModal = document.querySelector(`#${mid}`)
    currentOpenedModal.classList.toggle("show")
    currentOpenedModal.onclick = closeModal
}

/**
 * Function that animate the modal closing, and expanded card minimizing.
 * Reset the 'currentOpenedCard' and 'currentOpenedModal' global variables.
 */
async function closeModal() {
    currentOpenedCard.classList.toggle("collapse")
    currentOpenedModal.classList.toggle("show")
    currentOpenedModal = null
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