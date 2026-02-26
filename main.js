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
const showOnScrollObserver = new IntersectionObserver( (entries) => {
    entries.forEach( (entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.toggle("show")
        } else {
            entry.target.classList.toggle("show")
        }
    });
})

/* Get elements with scroll animation and add observer. */
const showOnScrollElements = document.querySelectorAll(".show-on-scroll.hidden")
showOnScrollElements.forEach( (el) => showOnScrollObserver.observe(el) );

/**
 * Show/hide the navbar when the navbar toggle button is pressed.
 * Hide the navbar when an element is pressed.
 * @returns void
 */
function toggleNavbar() {
    var navbar = document.getElementById("nav-bar");
    var navToggleIcon = document.getElementById("nav-toggle-icon");
    /* Only trigger toggle event if screen size is smaller than 800px */
    if ( !matchMedia("(max-width: 800px)").matches )  {
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
function toggleLightDarkMode(){
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

function openCard(e){
    /* For now duplicate the code when browser cannot handle transition API.
     * If method become more complex, create dedicated function.
     */
    currentOpenedCard = e
    currentOpenedCard.style.viewTransitionName = "modal"
    currentOpenedCard.style.filter = "blur(5px)"
    /* Create modal for page transition */
    let modal = currentOpenedCard.getElementsByTagName("modal-content")[0].cloneNode(true)
    modal.onclick = function(){
        closeCard()
    }
    currentOpenedModal = modal

    /* Fallback for browsers that don't support this API */
    if (!document.startViewTransition) {
        document.body.appendChild(modal)
        modal.style.display = "flex"
        return;
    }

    /* With a View Transition */
    document.startViewTransition(() => {
        document.body.appendChild(modal)
        modal.style.display = "flex"
        currentOpenedCard.style.viewTransitionName = ""
        currentOpenedCard.style.filter = ""
    });
}

function closeCard(){
    /* For now duplicate the code when browser cannot handle transition API.
     * If method become more complex, create dedicated function.
     */
    console.debug(`currentOpenedModal: ${currentOpenedModal}`)
    console.debug(`currentOpenedCard: ${currentOpenedCard}`)

    /* Fallback for browsers that don't support this API */
    if (!document.startViewTransition) {
        currentOpenedModal.style.display = "none"
        currentOpenedModal.remove()
        currentOpenedCard.style.visibility = "visible"
        currentOpenedModal = null
        currentOpenedCard = null
        return;
    }

    /* With a View Transition */
    document.startViewTransition(() => {
        currentOpenedModal.style.display = "none"
        currentOpenedModal.remove()
        currentOpenedCard.style.visibility = "visible"
        currentOpenedModal = null
        currentOpenedCard = null
    });
}