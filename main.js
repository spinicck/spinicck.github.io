/** =============================================================================
 * Main script for interactive website.
 * Author: Kévin SPINICCI
 * Data: 2025-09-18
 ============================================================================= */

var currentOpenedCard = null
var currentOpenedModal = null
var defaultCookieExdays = 365
var themeMode = getCookie("themeMode")

/**
 * Set the value of a cookie property.
 * @param {string} name Cookie name
 * @param {string} value Value of the cookie
 * @param {integer} exdays Numnber of days until cookie expires
 */
function setCookie(name, value, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
 * Get the value of a cookie property.
 * @param {string} name Name of the cookie to check
 * @returns The value of the cookie property or an empty string if the cookie is not found.
 */
function getCookie(name) {
  let cookieName = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cookieName) == 0) {
      return c.substring(cookieName.length, c.length);
    }
  }
  return "";
}

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
    switch (themeMode) {
        case "light":
            setThemeMode("dark")
            break;
        case "dark":
            setThemeMode("light")
        default:
            setThemeMode("light")
            break;
    }
}

/**
 * Switch the current theme to light or dark mode.
 * If the theme selected is not found, default to light theme.
 * @param {string} mode Mode to switch to, accepted values are "light" or "dark"
 */
function setThemeMode(mode){
    console.debug("set theme: ", mode)
    const hmtlTag = document.getElementsByTagName("html")[0];
    const navThemeIcon = document.getElementById("nav-theme-icon")
    const mobileNavThemeIcon = document.getElementById("mobile-nav-theme-icon")
    switch (mode) {
        case "light":
            themeMode = "light"
            hmtlTag.classList.remove("dark")
            hmtlTag.classList.add("light")
            setCookie("themeMode", themeMode, defaultCookieExdays)
            navThemeIcon.classList.remove("fa-moon")
            navThemeIcon.classList.add("fa-sun")
            mobileNavThemeIcon.classList.remove("fa-moon")
            mobileNavThemeIcon.classList.add("fa-sun")
            break;
        case "dark":
            themeMode = "dark"
            hmtlTag.classList.remove("light")
            hmtlTag.classList.add("dark")
            setCookie("themeMode", themeMode, defaultCookieExdays)
            navThemeIcon.classList.remove("fa-sun")
            navThemeIcon.classList.add("fa-moon")
            mobileNavThemeIcon.classList.remove("fa-un")
            mobileNavThemeIcon.classList.add("fa-moon")
            break;
        default:
            themeMode = "light"
            hmtlTag.classList.remove("dark")
            hmtlTag.classList.add("light")
            setCookie("themeMode", themeMode, defaultCookieExdays)
            navThemeIcon.classList.remove("fa-moon")
            navThemeIcon.classList.add("fa-sun")
            mobileNavThemeIcon.classList.remove("fa-moon")
            mobileNavThemeIcon.classList.add("fa-sun")
            break;
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

setThemeMode(themeMode)