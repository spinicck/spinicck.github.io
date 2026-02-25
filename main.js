/** =============================================================================
 * Main script for interactive website.
 * Author: Kévin SPINICCI
 * Data: 2025-09-18
 ============================================================================= */

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

/**
 * Method to expand and collapse a card item.
 * @param {Element to expand/collapse} e 
 */
function toggleExpandCard(e){
    /* Compute center of viewport */
    let centerX = window.innerWidth / 2
    let centerY = window.innerHeight / 2
    /* Compute center of current element */
    let bbox = e.getBoundingClientRect()
    let coordX = bbox.x + ( bbox.width / 2 )
    let coordY = bbox.y + ( bbox.height / 2 )
    /* Compute translation vector */
    let transVectX = centerX - coordX
    let transVectY = centerY - coordY
    isCollapsed = e.classList.contains("card-collapse")
    e.classList.toggle("card-collapse")
    e.classList.toggle("card-expand")
    console.debug(transVectX, " ", transVectY)
    /* Switch icon and animate entrance */
    let icon = e.getElementsByClassName("card-header-info")[0]
    icon.classList.toggle("fa-minimize")
    icon.classList.toggle("fa-expand")
    icon.animate(
        [
            // From
            { transform: "scale(0)", opacity: 0 },
            { transform: "scale(1)", opacity: 1 }
        ],
        { duration: 400, iterations: 1 }
    );
    if ( isCollapsed ) {
        e.style.transform = `translate(${transVectX}px, ${transVectY}px)`
    } else {
        e.style.transform = ""
    }
}